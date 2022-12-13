interface Settings {
	questionCount: number;
	questionTime: number;
	region: string;
	category: string;
	difficulty: string;
	tag?: string;
}

interface Question {
	questionId: string;
	question: string;
	answers: string[];
	correctAnswer: string;
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
	host?: boolean;
}

interface GameInformation {
	id: string;
	settings: Settings;
	questions: Question[];
	answers: Answer[];
	players: Player[];
}

export type { Settings, Question, PlayerAnswer, Answer, Player, GameInformation };
