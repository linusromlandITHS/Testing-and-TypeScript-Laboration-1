// External dependencies
import { Test, TestingModule } from '@nestjs/testing';

// Internal dependencies
import { OptionsController } from './options.controller';
import { OptionsService } from './options.service';
import { Options } from '_packages/shared/src/types';
import checkOptions from '$src/../test/helpers/checkOptions.helper';

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
			checkOptions(options, field);
		}
	});
});
