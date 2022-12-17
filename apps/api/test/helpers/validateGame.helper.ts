// Internal Dependencies
import { GameInformation } from '_packages/shared/src/types';
import {
	DEFAULT_QUESTION_COUNT,
	DEFAULT_QUESTION_TIME,
	DEFAULT_QUESTION_REGION,
	DEFAULT_QUESTION_DIFFICULTY,
	DEFAULT_QUESTION_CATEGORY,
	AUTH0_TEST_USERNAME
} from '$src/utils/env';
import { PlayerStatus } from '_packages/shared/src/enums';

export default function validateGame(result: GameInformation): void {
	expect(result).toBeDefined();

	expect(result).toHaveProperty('id'); // Check if the game has an ID

	expect(result.id).toMatch(/^[A-Z]{2}-[0-9]{4}$/);

	expect(result).toHaveProperty('settings'); // Check if the game has settings

	//Expect the settings to be the default settings
	expect(result.settings.questionCount).toBe(DEFAULT_QUESTION_COUNT);
	expect(result.settings.questionTime).toBe(DEFAULT_QUESTION_TIME);
	expect(result.settings.region).toBe(DEFAULT_QUESTION_REGION);
	expect(result.settings.category).toBe(DEFAULT_QUESTION_CATEGORY);
	expect(result.settings.difficulty).toBe(DEFAULT_QUESTION_DIFFICULTY);

	expect(result).toHaveProperty('questions'); // Check if the game has questions

	//Expect the questions to be empty
	expect(result.questions.length).toBe(0);

	expect(result).toHaveProperty('answers'); // Check if the game has answers

	expect(result).toHaveProperty('players'); // Check if the game has players

	//Expect the players to have one player
	expect(result.players.length).toBe(1);

	expect(result.players[0].status == PlayerStatus.HOST).toBe(true); // Check if the player is the host

	expect(result.players[0].email).toBe(AUTH0_TEST_USERNAME); // Check if the player's email is the same as the test username
}
