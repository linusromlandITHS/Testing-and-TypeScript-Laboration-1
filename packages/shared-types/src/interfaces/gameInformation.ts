import { GameStatus, PlayerStatus } from '../enums';

interface Settings {
	questionCount?: number;
	questionTime?: number;
	region?: string;
	category?: string;
	difficulty?: string;
	tag?: string;
}

interface Question {
	questionId: string;
	question: string;
	answers: string[];
	correctAnswer?: string;
}

interface PlayerAnswer {
	playerId: string;
	answer: string;
	correct: boolean;
}

interface Answer {
	questionId: string;
	playerAnswers: PlayerAnswer[];
}

interface Player {
	id: string;
	name: string;
	email: string;
	imageURL: string;
	score?: number;
	status?: PlayerStatus;
}

interface GameInformation {
	id: string;
	status: GameStatus;
	settings: Settings;
	questions: Question[];
	previousQuestions: Question[];
	activeQuestion?: Question;
	answers: Answer[];
	players: Player[];
}

export type { Settings, Question, PlayerAnswer, Answer, Player, GameInformation };
