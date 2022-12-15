// External dependencies
import { Test, TestingModule } from '@nestjs/testing';

// Internal dependencies
import { GameGateway } from './game.gateway';
import { GameService } from './game.service';

describe('GameGateway', () => {
	let gateway: GameGateway;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [GameService, GameGateway]
		}).compile();

		gateway = module.get<GameGateway>(GameGateway);
	});

	it('should be defined', () => {
		expect(gateway).toBeDefined();
	});
});
