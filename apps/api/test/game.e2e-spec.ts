// External dependencies
import * as request from 'supertest';
import { Socket, io } from 'socket.io-client';

// Internal dependencies
import validateGame from './helpers/validateGame.helper';
import { GameInformation } from '_packages/shared/src/types';
import { GameStatus } from '_packages/shared/src/enums';
import { QUESTION_INTRO_TIME } from '_packages/shared/src/constants';

let gamePin: string;

describe('GameController (e2e)', () => {
	it('/game (POST) - Invalid token', () => {
		return request(global.SERVER)
			.post('/game')
			.set('Authorization', 'Bearer invalid_token')
			.expect(401)
			.expect('Content-Type', /json/)
			.then((res: request.Response) => {
				expect(res.body).toEqual({
					statusCode: 401,
					message: 'Unauthorized'
				});
			});
	});

	it('/game (POST) - Valid Token', () => {
		return request(global.SERVER)
			.post('/game')
			.set('Authorization', `Bearer ${global.ACCESS_TOKEN}`)
			.expect(201)
			.expect('Content-Type', /json/)
			.then((res: request.Response) => {
				validateGame(res.body);
				gamePin = res.body.id;
			});
	});
});

describe('GameGateway (e2e)', () => {
	//Increase timeout
	jest.setTimeout(30000 + QUESTION_INTRO_TIME * 3);

	let socket: Socket;
	beforeAll(() => {
		socket = io(`http://localhost:${global.PORT}`, {
			extraHeaders: {
				Authorization: `Bearer ${global.ACCESS_TOKEN}`
			}
		});
	});

	afterAll(() => socket.disconnect());

	it('change settings on the game', (done: jest.DoneCallback) => {
		socket.emit('events', {
			gamePin,
			event: 'changeSettings',
			settings: {
				questionCount: 2,
				questionTime: 5,
				region: 'us',
				category: 'sports',
				difficulty: 'easy',
				tag: 'football'
			}
		});

		socket.on(gamePin, (data: GameInformation) => {
			expect(data).toBeDefined();
			expect(data).toHaveProperty('settings');
			expect(data.settings).toHaveProperty('region', 'us');
			expect(data.settings).toHaveProperty('category', 'sports');
			expect(data.settings).toHaveProperty('difficulty', 'easy');
			expect(data.settings).toHaveProperty('tag', 'football');
			done();
		});
	});

	it('play a game', (done: jest.DoneCallback) => {
		socket.emit('events', {
			gamePin,
			event: 'startGame'
		});

		socket.on(gamePin, (data: GameInformation) => {
			expect(data).toHaveProperty('status');

			let previousScore: number = 0;

			if (data.status === GameStatus.QUESTION) {
				expect(data).toHaveProperty('activeQuestion');
				setTimeout(() => {
					socket.emit('events', {
						gamePin,
						event: 'answerQuestion',
						questionId: data.activeQuestion.questionId,
						answer: data.activeQuestion.answers[0]
					});
				}, QUESTION_INTRO_TIME + 1000);
			} else if (data.status === GameStatus.LEADERBOARD) {
				if (
					data.answers[data.previousQuestions[data.previousQuestions.length - 1].questionId][data.players[0].id].correct
				) {
					expect(data.players[0].score).toBeGreaterThan(previousScore);
				} else {
					expect(data.players[0].score).toBe(previousScore);
				}
				previousScore = data.players[0].score;

				if (data.previousQuestions.length >= data.settings.questionCount) done();
				else socket.emit('events', { gamePin, event: 'nextQuestion' });
			}
		});
	});
});
