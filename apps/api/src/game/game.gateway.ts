// External Dependencies
import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { UseGuards } from '@nestjs/common';
import { Socket } from 'socket.io';

// Internal Dependencies
import { AuthGuard } from '$src/guards/auth.guard';
import { GameInformation, Player, WebSocketEvent } from '_packages/shared/src/types';
import { GameService } from './game.service';
import getUserInformation from '$src/utils/getUserInformation';
import validateWebSocketEvent from '$src/utils/validateWebSocketEvent';

@WebSocketGateway()
export class GameGateway {
	constructor(private readonly gameService: GameService) {}

	private readonly events = {
		changeSettings: this.gameService.changeSettings,
		changePlayerStatus: this.gameService.changePlayerStatus,
		startGame: this.gameService.startGame,
		nextQuestion: this.gameService.nextQuestion,
		answerQuestion: this.gameService.answerQuestion
	};

	@UseGuards(AuthGuard)
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
			const userInformation: Player = await getUserInformation(token);

			if (data.event in this.events) {
				const gameInformation: GameInformation | void = await this.events[data.event](data, userInformation, client);

				if (!gameInformation) return;

				//Emit to all clients
				client.emit(data.gamePin, gameInformation);

				return gameInformation;
			}
		} catch (error) {
			console.log('Error occured in src/game/game.gateway.ts:handleMessage()');
			console.log('Error: ', error);
		}
	}
}
