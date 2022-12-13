// External dependencies
import { Injectable } from '@nestjs/common';

// Internal dependencies
import { GameInformation, Player } from '_packages/shared-types';
import generateGameId from '$src/utils/generateGameId';
import getUserInformation from '$src/utils/getUserInformation';
import {
	DEFAULT_QUESTION_COUNT,
	DEFAULT_QUESTION_TIME,
	DEFAULT_QUESTION_REGION,
	DEFAULT_QUESTION_DIFFICULTY,
	DEFAULT_QUESTION_CATEGORY
} from '$src/utils/env';

@Injectable()
export class GameService {
	private games: GameInformation[] = [];

	async createGame(token: string): Promise<GameInformation> {
		const user: Player = await getUserInformation(token); // Get the user's information from the auth server

		if (!user) return null; // If the user doesn't exist, return null

		const game: GameInformation = {
			id: generateGameId(this.games.map((game: GameInformation) => game.id)), // Generate a unique game ID
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
					host: true
				}
			]
		};

		this.games.push(game); // Add the game to the list of games

		return game; // Return the game
	}
}
