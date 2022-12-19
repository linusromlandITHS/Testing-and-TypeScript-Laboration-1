// External dependencies
import { Controller, Post, Headers, Param, Get, HttpStatus, HttpException } from '@nestjs/common';

// Internal dependencies
import { GameInformation } from '_packages/shared/src/types';
import { GameService } from './game.service';

@Controller('game')
export class GameController {
	constructor(private readonly gameService: GameService) {}

	@Post()
	async createGame(@Headers('Authorization') token: string): Promise<GameInformation> {
		token = token.split(' ')[1]; // Remove the "Bearer " from the token

		const game: GameInformation = await this.gameService.createGame(token);

		if (!game) throw new HttpException('Failed to create game', 500); // If the game is not found, throw a 500 error

		return game; // Return the game
	}

	@Get(':gameId')
	async joinGame(
		@Param('gameId') gameId: string,
		@Headers('Authorization') token: string
	): Promise<GameInformation | HttpStatus> {
		token = token.split(' ')[1]; // Remove the "Bearer " from the token

		const game: GameInformation = await this.gameService.joinGame(token, gameId);

		if (!game || typeof game !== 'object') throw new HttpException('Game not found', 404); // If the game is not found, throw a 404 error

		return game; // Return the game
	}

	@Get(':gameId/exists')
	async gameExists(
		@Param('gameId') gameId: string,
		@Headers('Authorization') token: string
	): Promise<boolean | HttpStatus> {
		token = token.split(' ')[1]; // Remove the "Bearer " from the token

		const gameExists: boolean = await this.gameService.gameExists(token, gameId);

		if (!gameExists) throw new HttpException('Game not found', 404); // If the game is not found, throw a 404 error

		return gameExists; // Return the game
	}
}
