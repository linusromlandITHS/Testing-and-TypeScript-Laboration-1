import { QUESTION_MAX_POSSIBLE_POINTS } from './env';

export default function calculateScore(responseTime: number, questionTime: number, streak: number): number {
	//Check so parameters are numbers and positive
	if (
		typeof responseTime !== 'number' ||
		typeof questionTime !== 'number' ||
		typeof streak !== 'number' ||
		responseTime < 0 ||
		questionTime < 0 ||
		streak < 0
	)
		return;

	let score: number = Math.round((1 - responseTime / questionTime / 2) * QUESTION_MAX_POSSIBLE_POINTS);

	//Check if stream is higher or equal to 3
	if (streak >= 3) {
		//Logarithmic function to calculate the streak bonus
		score += Math.round(Math.log(streak) * (QUESTION_MAX_POSSIBLE_POINTS / 10));
	}

	return score;
}
