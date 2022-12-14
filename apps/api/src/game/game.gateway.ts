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
		changeSettings: this.gameService.changeSettings
		// startGame: this.gameService.startGame
	};

	@UseGuards(AuthGuard)
	@SubscribeMessage('events')
	async handleMessage(client: Socket, payload: string): Promise<void> {
		try {
			//If empty payload, return
			if (!payload) return console.log('Empty payload');

			//Read WS Headers
			const token: string = client.handshake.headers['authorization']?.split(' ')[1];

			//Get user information
			const userInformation: Player = await getUserInformation(token);

			//Convert payload to JSON
			const data: SocketData = JSON.parse(payload);

			if (!data.gamePin) return console.log('No game pin provided');

			if (data.event in this.events) {
				const gameInformation: GameInformation = this.events[data.event](data, userInformation);

				if (!gameInformation) return console.log('Game not found');

				//Emit to all clients
				client.emit(data.gamePin, gameInformation);
			}
		} catch (error) {
			console.log(error);
			console.log('Error occured in src/game/game.gateway.ts:handleMessage()');
		}
	}
}
