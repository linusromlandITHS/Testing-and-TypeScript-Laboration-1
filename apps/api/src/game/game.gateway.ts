// External Dependencies
import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';

// Internal Dependencies
import { GameInformation, Player, WebSocketEvent } from '_packages/shared/src/types';
import { GameService } from './game.service';
import getUserInformation from '$src/utils/getUserInformation';
import validateWebSocketEvent from '$src/utils/validateWebSocketEvent';

@WebSocketGateway({ cors: true })
export class GameGateway {
	constructor(private readonly gameService: GameService) {}

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
			if (!data) return console.log('Empty payload');

			//Validate data
			if (!validateWebSocketEvent(data)) return console.log('Invalid payload');

			//Read WS Headers
			const token: string = client.handshake.headers['authorization']?.split(' ')[1];

			//Get user information
			const userInformation: Player = getUserInformation(token);
			console.log(userInformation.id);
			console.log(`User ${userInformation.name} sent event ${data.event} to game ${data.gamePin}`);

			if (data.event in this.events) {
				const gameInformation: GameInformation | void = await this.events[data.event](data, userInformation, client);

				if (!gameInformation) return;

				console.log(`Game ${data.gamePin} sent event ${data.event} to user ${userInformation.name}`);
				//Emit to all clients
				client.emit(data.gamePin, gameInformation);
				client.broadcast.emit(data.gamePin, gameInformation);

				return gameInformation;
			}
		} catch (error) {
			console.log('Error occured in src/game/game.gateway.ts:handleMessage()');
			console.log('Error: ', error);
		}
	}

	@SubscribeMessage('disconnect')
	handleDisconnect(client: Socket): void {
		//Read WS Headers
		const token: string = client.handshake.headers['authorization']?.split(' ')[1];
		console.log(`User ${token} disconnected`);
		if (!token) return;

		this.gameService.leaveGame(token, client);
	}
}
