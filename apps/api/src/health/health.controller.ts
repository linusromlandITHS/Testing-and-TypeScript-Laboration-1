// External dependencies
import { Get } from '@nestjs/common';
import { Controller } from '@nestjs/common';

// Internal dependencies
import { HealthService } from './health.service';

@Controller('health')
export class HealthController {
	constructor(private readonly healthService: HealthService) {}

	@Get()
	async getHealth() {
		return await this.healthService.getHealth();
	}
}
