// External Dependencies
import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { UseGuards } from '@nestjs/common';
import { Socket } from 'socket.io';

// Internal Dependencies
import { AuthGuard } from '$src/guards/auth.guard';
import { GameInformation, SocketData } from '_packages/shared-types';
import { GameService } from './game.service';

@WebSocketGateway()
export class GameGateway {
	constructor(private readonly gameService: GameService) {}

	private readonly events = {
		changeSettings: this.gameService.changeSettings
	};

	@UseGuards(AuthGuard)
	@SubscribeMessage('events')
	handleMessage(client: Socket, payload: string): void {
		try {
			//If empty payload, return
			if (!payload) return console.log('Empty payload');

			//Convert payload to JSON
			const data: SocketData = JSON.parse(payload);

			if (!data.gamePin) return console.log('No game pin provided');

			if (data.event in this.events) {
				const gameInformation: GameInformation = this.events[data.event](data);

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
