// Internal dependencies
import calculateScore from './calculateScore';
import { QUESTION_MAX_POSSIBLE_POINTS } from './env';

describe('calculateScore', () => {
	it('should calculate the correct score', () => {
		const score: number = calculateScore(0, 1000, 0);
		expect(score).toBe(QUESTION_MAX_POSSIBLE_POINTS);
	});

	it('should calculate the correct score with a streak', () => {
		const score: number = calculateScore(0, 1000, 3);
		expect(score).toBe(QUESTION_MAX_POSSIBLE_POINTS + 110);
	});

	it('should calculate a score of half of max', () => {
		const score: number = calculateScore(1000, 1000, 0);
		expect(score).toBe(QUESTION_MAX_POSSIBLE_POINTS / 2);
	});

	it('should calculate a score of zero if answered after the time is up', () => {
		const score: number = calculateScore(2000, 1000, 0);
		expect(score).toBe(0);
	});

	it('should fail if the responseTime is null', () => {
		const score: number = calculateScore(null, 1000, 0);
		expect(score).toBe(undefined);
	});

	it('should fail if the questionTime is null', () => {
		const score: number = calculateScore(0, null, 0);
		expect(score).toBe(undefined);
	});

	it('should fail if the streak is null', () => {
		const score: number = calculateScore(0, 1000, null);
		expect(score).toBe(undefined);
	});

	it('should fail if the responseTime is undefined', () => {
		const score: number = calculateScore(undefined, 1000, 0);
		expect(score).toBe(undefined);
	});

	it('should fail if the questionTime is undefined', () => {
		const score: number = calculateScore(0, undefined, 0);
		expect(score).toBe(undefined);
	});

	it('should fail if the streak is undefined', () => {
		const score: number = calculateScore(0, 1000, undefined);
		expect(score).toBe(undefined);
	});

	it('should fail if the responseTime is negative', () => {
		const score: number = calculateScore(-1, 1000, 0);
		expect(score).toBe(undefined);
	});

	it('should fail if the questionTime is negative', () => {
		const score: number = calculateScore(0, -1, 0);
		expect(score).toBe(undefined);
	});

	it('should fail if the streak is negative', () => {
		const score: number = calculateScore(0, 1000, -1);
		expect(score).toBe(undefined);
	});

	it('should fail if the responseTime is a boolean', () => {
		// @ts-expect-error - This is a test
		const score: number = calculateScore(true, 1000, 0);
		expect(score).toBe(undefined);
	});

	it('should fail if the questionTime is a boolean', () => {
		// @ts-expect-error - This is a test
		const score: number = calculateScore(0, false, 0);
		expect(score).toBe(undefined);
	});

	it('should fail if the streak is a boolean', () => {
		// @ts-expect-error - This is a test
		const score: number = calculateScore(0, 1000, true);
		expect(score).toBe(undefined);
	});
});
