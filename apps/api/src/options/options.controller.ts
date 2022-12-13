// External dependencies
import { Controller, Get } from '@nestjs/common';

// Internal dependencies
import { OptionsService } from './options.service';
import { Options } from '_packages/shared-types/src';

@Controller('options')
export class OptionsController {
	constructor(private readonly optionsService: OptionsService) {}

	@Get()
	async getOptions(): Promise<Options> {
		return await this.optionsService.getOptions();
	}
}
