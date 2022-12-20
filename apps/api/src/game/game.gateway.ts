// External Dependencies
import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket } from 'socket.io';

// Internal Dependencies
import { GameInformation, Player, WebSocketEvent } from '_packages/shared/src/types';
import { GameService } from './game.service';
import getUserInformation from '$src/utils/getUserInformation';
import validateWebSocketEvent from '$src/utils/validateWebSocketEvent';

@WebSocketGateway({ cors: true })
export class GameGateway {
	constructor(private readonly gameService: GameService) {}
	private readonly logger = new Logger(GameGateway.name);

	private readonly events = {
		joinGame: async (data: WebSocketEvent, userInformation: Player): Promise<GameInformation> =>
			await this.gameService.joinGame('', data.gamePin, userInformation),
		changeSettings: this.gameService.changeSettings,
		changePlayerStatus: this.gameService.changePlayerStatus,
		startGame: this.gameService.startGame,
		nextQuestion: this.gameService.nextQuestion,
		answerQuestion: this.gameService.answerQuestion
	};

	@SubscribeMessage('events')
	async handleMessage(client: Socket, data: WebSocketEvent): Promise<GameInformation | void> {
		try {
			//If empty data, return
			if (!data) return this.logger.error('Empty payload');

			//Validate data
			if (!validateWebSocketEvent(data)) return this.logger.error('Invalid payload');

			//Read WS Headers
			const token: string = client.handshake.headers['authorization']?.split(' ')[1];

			//Get user information
			const userInformation: Player = getUserInformation(token);

			if (data.event in this.events) {
				const gameInformation: GameInformation | void = await this.events[data.event](data, userInformation, client);

				if (!gameInformation) return;

				this.logger.log(`Game ${data.gamePin} sent event ${data.event} to user ${userInformation.name}`);

				const socketData: string = JSON.stringify({
					...gameInformation,
					timeout: undefined,
					questions: []
				});

				//Emit to all clients
				client.emit(data.gamePin, socketData);
				client.broadcast.emit(data.gamePin, socketData);

				return {
					...gameInformation,
					timeout: undefined,
					questions: []
				};
			}
		} catch (error) {
			this.logger.error('Error occured in src/game/game.gateway.ts:handleMessage()');
			this.logger.error('Error: ', error);
		}
	}

	@SubscribeMessage('disconnect')
	handleDisconnect(client: Socket): void {
		//Read WS Headers
		const token: string = client.handshake.headers['authorization']?.split(' ')[1];
		if (!token) return;

		this.gameService.leaveGame(token, client);
	}
}
