// External dependencies
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// Internal dependencies
import { HealthModule } from './health/health.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true
		}),
		HealthModule
	]
})
export class AppModule {}
