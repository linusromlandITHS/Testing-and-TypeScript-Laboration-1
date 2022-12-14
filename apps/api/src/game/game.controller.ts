// External dependencies
import { Controller, Post, Headers, Param, Get, HttpStatus } from '@nestjs/common';

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

	@Get(':gameId')
	async joinGame(
		@Param('gameId') gameId: string,
		@Headers('Authorization') token: string
	): Promise<GameInformation | HttpStatus> {
		token = token.split(' ')[1]; // Remove the "Bearer " from the token

		const game: GameInformation = await this.gameService.joinGame(token, gameId);

		if (!game) return HttpStatus.NOT_FOUND; // If the game doesn't exist, return null

		return game; // Return the game
	}
}
