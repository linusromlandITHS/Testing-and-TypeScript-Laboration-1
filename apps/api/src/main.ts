// External dependencies
import { NestFactory } from '@nestjs/core';
import { INestApplication } from '@nestjs/common';

// Internal dependencies
import { AppModule } from './app.module';
import { PORT } from '$src/utils/env';

async function bootstrap(): Promise<void> {
	const app: INestApplication = await NestFactory.create(AppModule, { cors: true });

	await app.listen(PORT);
}
bootstrap();
