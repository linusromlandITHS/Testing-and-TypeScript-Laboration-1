// External dependencies
import { Test, TestingModule } from '@nestjs/testing';

// Internal dependencies
import getAccessToken from '$src/../test/helpers/getAccessToken.helper';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { GameInformation } from '_packages/shared/src/types';
import validateGame from '$src/../test/helpers/validateGame.helper';

describe('GameController', () => {
	let controller: GameController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [GameController],
			providers: [GameService]
		}).compile();

		controller = module.get<GameController>(GameController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	it('should create a game', async () => {
		const accessToken: string = await getAccessToken();

		const result: GameInformation = await controller.createGame(`Bearer ${accessToken}`);
		validateGame(result);
	});
});
