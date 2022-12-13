// Load environment variables
import * as dotenv from 'dotenv';
dotenv.config();

// External dependencies
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

// Internal dependencies
import { AppModule } from './app.module';
import { AuthGuard } from './guards/auth.guard';

async function bootstrap(): Promise<void> {
	const app: NestFastifyApplication = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
	app.useGlobalGuards(new AuthGuard());
	await app.listen(3000);
}
bootstrap();
