// External dependencies
import { Injectable } from '@nestjs/common';

// Internal dependencies
import { GameInformation, Player, Settings, SocketData } from '_packages/shared-types';
import { GameStatus, PlayerStatus } from '_packages/shared-types/src/enums';
import generateGameId from '$src/utils/generateGameId';
import getUserInformation from '$src/utils/getUserInformation';
import {
	DEFAULT_QUESTION_COUNT,
	DEFAULT_QUESTION_TIME,
	DEFAULT_QUESTION_REGION,
	DEFAULT_QUESTION_DIFFICULTY,
	DEFAULT_QUESTION_CATEGORY
} from '$src/utils/env';

const games: GameInformation[] = [];

@Injectable()
export class GameService {
	async createGame(token: string): Promise<GameInformation> {
		const user: Player = await getUserInformation(token); // Get the user's information from the auth server

		if (!user) return null; // If the user doesn't exist, return null

		const game: GameInformation = {
			id: generateGameId(games.map((game: GameInformation) => game.id)), // Generate a unique game ID
			status: GameStatus.JOINING,
			settings: {
				// Set the default settings
				questionCount: DEFAULT_QUESTION_COUNT,
				questionTime: DEFAULT_QUESTION_TIME,
				region: DEFAULT_QUESTION_REGION,
				category: DEFAULT_QUESTION_CATEGORY,
				difficulty: DEFAULT_QUESTION_DIFFICULTY
			},
			questions: [],
			answers: [],
			players: [
				// Add the host to the player list
				{
					...user,
					status: PlayerStatus.HOST
				}
			]
		};

		games.push(game); // Add the game to the list of games

		return game; // Return the game
	}

	joinGame(gameId: string): GameInformation {
		const game: GameInformation = games.find((game: GameInformation) => game.id === gameId); // Find the game

		if (!game) return null; // If the game doesn't exist, return null

		return game; // Return the game
	}

	changeSettings(data: SocketData): GameInformation {
		const game: GameInformation = games.find((game: GameInformation) => game.id === data.gamePin); // Find the game

		if (!game) return null; // If the game doesn't exist, return null

		//Loop through all the settings keys and update the game's settings as a for in loop
		for (const key in data.settings) {
			game.settings[key] = data.settings[key];
		}

		return game; // Return the game
	}
}
