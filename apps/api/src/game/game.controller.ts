// External dependencies
import { Controller, Post, Headers } from '@nestjs/common';

// Internal dependencies
import { GameInformation } from '_packages/shared-types';
import { GameService } from './game.service';

@Controller('game')
export class GameController {
	constructor(private readonly gameService: GameService) {}

	@Post()
	async createGame(@Headers('Authorization') token: string): Promise<GameInformation> {
		token = token.split(' ')[1]; // Remove the "Bearer " from the token
		return await this.gameService.createGame(token);
	}
}
