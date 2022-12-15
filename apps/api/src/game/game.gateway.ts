// External Dependencies
import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { UseGuards } from '@nestjs/common';
import { Socket } from 'socket.io';

// Internal Dependencies
import { AuthGuard } from '$src/guards/auth.guard';
import { GameInformation, Player, SocketData } from '_packages/shared-types';
import { GameService } from './game.service';
import getUserInformation from '$src/utils/getUserInformation';

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
	async handleMessage(client: Socket, data: SocketData): Promise<void> {
		try {
			//If empty data, return
			if (!data) return console.log('Empty payload');

			//Read WS Headers
			const token: string = client.handshake.headers['authorization']?.split(' ')[1];

			//Get user information
			const userInformation: Player = await getUserInformation(token);

			if (!data.gamePin) return console.log('No game pin provided');

			if (data.event in this.events) {
				const gameInformation: GameInformation | void = await this.events[data.event](data, userInformation, client);

				if (!gameInformation) return;

				//Emit to all clients
				client.emit(data.gamePin, gameInformation);
			}
		} catch (error) {
			console.log('Error occured in src/game/game.gateway.ts:handleMessage()');
			console.log('Error: ', error);
		}
	}
}
