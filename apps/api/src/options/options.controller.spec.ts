// External dependencies
import { Test, TestingModule } from '@nestjs/testing';

// Internal dependencies
import { OptionsController } from './options.controller';
import { OptionsService } from './options.service';
import { Options } from '_packages/shared-types';

describe('OptionsController', () => {
	let controller: OptionsController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [OptionsController],
			providers: [OptionsService]
		}).compile();

		controller = module.get<OptionsController>(OptionsController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	it('should return a options object', async () => {
		const options: Options = await controller.getOptions();
		const fields: string[] = ['categories', 'tags', 'regions', 'difficulties'];

		for (const field of fields) {
			testOptions(options, field);
		}
	});
});

function testOptions(options: Options, field: string): void {
	expect(options).toHaveProperty(field, expect.any(Array));
	expect(options[field].length).toBeGreaterThan(0);
	expect(options[field][0]).toHaveProperty('label', expect.any(String));
	expect(options[field][0]).toHaveProperty('value', expect.any(String));
}
