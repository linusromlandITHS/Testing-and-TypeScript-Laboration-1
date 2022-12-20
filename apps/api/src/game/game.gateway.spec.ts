// External dependencies
import { Test, TestingModule } from '@nestjs/testing';
import getAccessToken from '$src/../test/helpers/getAccessToken.helper';
import { GameInformation } from '_packages/shared/src/types';
import { Socket } from 'socket.io';

// Internal dependencies
import { GameGateway } from './game.gateway';
import { GameService } from './game.service';
import { GameStatus, PlayerStatus } from '_packages/shared/src/enums';
import { QUESTION_INTRO_TIME } from '_packages/shared/src/constants';

describe('GameGateway', () => {
	//Increase timeout
	jest.setTimeout(15000 + QUESTION_INTRO_TIME);

	let gateway: GameGateway;
	let gameId: string;
	let token: string;
	let socket: Socket;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [GameService, GameGateway]
		}).compile();
		gateway = module.get<GameGateway>(GameGateway);

		//Create a game
		token = await getAccessToken();
		const game: GameInformation = await module.get<GameService>(GameService).createGame(token);
		gameId = game.id;
		socket = {
			handshake: {
				headers: {
					authorization: `Bearer ${token}`
				}
			},
			emit: () => true,
			broadcast: {
				emit: () => true
			}
		} as unknown as Socket;
	});

	it('should be defined', () => {
		expect(gateway).toBeDefined();
	});

	it('host should be able to changeSettings', async () => {
		const game: GameInformation | void = await gateway.handleMessage(socket, {
			gamePin: gameId,
			event: 'changeSettings',
			settings: {
				isPrivate: false,
				questionCount: 2,
				questionTime: 10,
				region: 'US',
				category: 'music',
				difficulty: 'hard',
				// eslint-disable-next-line quotes
				tag: "1980's"
			}
		});

		expect(game).toBeDefined();
		if (!game) return; //To catch if game is undefined

		expect(game.settings.isPrivate).toBe(false);
		expect(game.settings.questionCount).toBe(2);
		expect(game.settings.questionTime).toBe(10);
		expect(game.settings.region).toBe('US');
		expect(game.settings.category).toBe('music');
		expect(game.settings.difficulty).toBe('hard');
		// eslint-disable-next-line quotes
		expect(game.settings.tag).toBe("1980's");
		expect(game.players[0].status == PlayerStatus.HOST).toBe(true);
		expect(game.status == GameStatus.LOBBY).toBe(true);
	});

	it('should be able to join game', async () => {
		const game: GameInformation | void = await gateway.handleMessage(socket, {
			gamePin: gameId,
			event: 'joinGame'
		});

		expect(game).toBeDefined();
	});

	it('host should be able to start game', async () => {
		const game: GameInformation | void = await gateway.handleMessage(socket, {
			gamePin: gameId,
			event: 'startGame'
		});

		expect(game).toBeDefined();
		if (!game) return; //To catch if game is undefined

		expect(game.status == GameStatus.QUESTION).toBe(true);

		await new Promise((resolve: (value: unknown) => void) => setTimeout(resolve, 10 * 1000 + QUESTION_INTRO_TIME));
	});

	it('host should not be able to changeSettings if game has already started', async () => {
		// Start the game
		await gateway.handleMessage(socket, {
			gamePin: gameId,
			event: 'startGame'
		});

		const game: GameInformation | void = await gateway.handleMessage(socket, {
			gamePin: gameId,
			event: 'changeSettings',
			settings: {
				isPrivate: false,
				questionCount: 2,
				questionTime: 10,
				region: 'US',
				category: 'music',
				difficulty: 'hard',
				// eslint-disable-next-line quotes
				tag: "1980's"
			}
		});

		expect(game).toBeUndefined();

		await new Promise((resolve: (value: unknown) => void) => setTimeout(resolve, 10 * 1000 + QUESTION_INTRO_TIME));
	});

	it('host should not be able to changeSettings if game does not exist', async () => {
		const game: GameInformation | void = await gateway.handleMessage(socket, {
			gamePin: '1234',
			event: 'changeSettings',
			settings: {
				isPrivate: false,
				questionCount: 2,
				questionTime: 10,
				region: 'US',
				category: 'music'
			}
		});

		expect(game).toBeUndefined();
	});

	it('host should not be able to change player status', async () => {
		const game: GameInformation | void = await gateway.handleMessage(socket, {
			gamePin: gameId,
			event: 'changePlayerStatus',
			status: PlayerStatus.READY
		});

		expect(game).toBeUndefined();
	});

	it('host should not be able to start game if there are no questions for settings', async () => {
		await gateway.handleMessage(socket, {
			gamePin: gameId,
			event: 'changeSettings',
			settings: {
				isPrivate: false,
				questionCount: 2,
				questionTime: 10,
				region: 'US',
				category: 'music',
				difficulty: 'puck',
				tag: 'colours'
			}
		});

		const game: GameInformation | void = await gateway.handleMessage(socket, {
			gamePin: gameId,
			event: 'startGame'
		});

		expect(game).toBeUndefined();
	});
});
