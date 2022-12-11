// External dependencies
import { NestFactory } from '@nestjs/core';
import { INestApplication } from '@nestjs/common';

// Internal dependencies
import { AppModule } from './app.module';
import { AuthGuard } from './guards/auth.guard';

async function bootstrap() {
	const app: INestApplication = await NestFactory.create(AppModule);
	app.useGlobalGuards(new AuthGuard());
	await app.listen(3000);
}
bootstrap();
