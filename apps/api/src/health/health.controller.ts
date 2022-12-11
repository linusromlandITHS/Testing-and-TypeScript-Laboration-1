// External dependencies
import { Controller, Get } from '@nestjs/common';

// Internal dependencies
import { HealthService } from './health.service';
import { HealthResult } from '_packages/shared-types/src';

@Controller('health')
export class HealthController {
	constructor(private readonly healthService: HealthService) {}

	@Get()
	async getHealth(): Promise<HealthResult> {
		return await this.healthService.getHealth();
	}
}
