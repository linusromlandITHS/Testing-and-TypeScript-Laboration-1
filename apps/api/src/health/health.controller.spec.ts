// External dependencies
import { Test, TestingModule } from '@nestjs/testing';

// Internal dependencies
import { HealthResult } from '_packages/shared/src/types';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';

describe('HealthController', () => {
	let controller: HealthController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [HealthController],
			providers: [HealthService]
		}).compile();

		controller = module.get<HealthController>(HealthController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	it('should return a health object', async () => {
		const health: HealthResult = await controller.getHealth();
		expect(health).toHaveProperty('api.running', expect.any(Boolean));
		expect(health).toHaveProperty('triviaAPI.running', expect.any(Boolean));
	});
});
