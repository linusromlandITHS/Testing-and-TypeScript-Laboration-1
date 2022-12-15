// External dependencies
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Socket } from 'socket.io';

// Internal dependencies
import { GameInformation, Player, Question, SocketData } from '_packages/shared-types';
import { GameStatus, PlayerStatus } from '_packages/shared-types/src/enums';
import generateGameId from '$src/utils/generateGameId';
import getUserInformation from '$src/utils/getUserInformation';
import axios from '$src/utils/axios';
import { TRIVIA_API_URL } from '$src/utils/constants';
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
			previousQuestions: [],
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

	async joinGame(token: string, gameId: string): Promise<GameInformation> {
		const user: Player = await getUserInformation(token); // Get the user's information from the auth server

		if (!user) return null; // If the user doesn't exist, return null

		const game: GameInformation = games.find((game: GameInformation) => game.id === gameId); // Find the game

		if (!game) return null; // If the game doesn't exist, return null

		if (game.status != GameStatus.JOINING) return; // If the game isn't in the joining phase, return null

		if (!game.players.find((player: Player) => player.id === user.id))
			game.players.push({
				...user,
				status: PlayerStatus.NOT_READY
			}); // If the user isn't already in the game, add them

		return game; // Return the game
	}

	async changeSettings(data: SocketData, user: Player): Promise<GameInformation> {
		const game: GameInformation = games.find((game: GameInformation) => game.id === data.gamePin); // Find the game

		if (!game) return null; // If the game doesn't exist, return null

		const player: Player = game.players.find((player: Player) => player.id === user.id); // Find the player

		if (!player) return null; // If the player doesn't exist, return null

		if (player.status !== PlayerStatus.HOST) return null; //Check if the player is not the host

		//Loop through all the settings keys and update the game's settings as a for in loop
		for (const key in data.settings) {
			game.settings[key] = data.settings[key];
		}

		return game; // Return the game
	}

	async startGame(data: SocketData, user: Player, client: Socket): Promise<GameInformation> {
		const game: GameInformation = games.find((game: GameInformation) => game.id === data.gamePin); // Find the game

		if (!game) return null; // If the game doesn't exist, return null

		const player: Player = game.players.find((player: Player) => player.id === user.id); // Find the player

		if (!player) return null; // If the player doesn't exist, return null

		if (player.status !== PlayerStatus.HOST) return null; //Check if the player is not the host

		//Get the questions from the trivia API
		const response: AxiosResponse = await axios.get(
			`${TRIVIA_API_URL}/questions?amount=${game.settings.questionCount}&region=${game.settings.region}&category=${game.settings.category}&difficulty=${game.settings.difficulty}&tag=${game.settings.tag}`
		);

		if (response.status !== 200) return null; // If the response isn't 200, return null

		if (response.data.length < game.settings.questionCount) return null; // If the response doesn't have enough questions, return null

		// Set the game's questions to the response data
		game.questions = response.data.map((q: { id: any; question: any; incorrectAnswers: any; correctAnswer: any }) => ({
			// Set the game's questions to the response data
			questionId: q.id,
			question: q.question,
			answers: [...q.incorrectAnswers, q.correctAnswer],
			correctAnswer: q.correctAnswer
		}));

		return await this.nextQuestion(data, user, client); // Return the game
	}

	async nextQuestion(data: SocketData, user: Player, client: Socket): Promise<GameInformation> {
		const game: GameInformation = games.find((game: GameInformation) => game.id === data.gamePin); // Find the game

		if (!game) return null; // If the game doesn't exist, return null

		const player: Player = game.players.find((player: Player) => player.id === user.id); // Find the player

		if (!player) return null; // If the player doesn't exist, return null

		if (player.status !== PlayerStatus.HOST) return null; //Check if the player is not the host

		//Set a timeout to show the correct answer and leaderboard
		game.status = GameStatus.QUESTION;
		setTimeout(() => {
			game.status = GameStatus.LEADERBOARD;
			game.previousQuestions.push(game.questions[game.previousQuestions.length]);
			game.activeQuestion = null;

			client.emit(game.id, {
				...game,
				questions: []
			});
		}, game.settings.questionTime * 1000);

		//Return game with the first question as the current question and empty question array
		const question: Question = game.questions[game.previousQuestions.length];
		return {
			...game,
			activeQuestion: {
				...question,
				correctAnswer: null
			},
			questions: []
		};
	}
}
