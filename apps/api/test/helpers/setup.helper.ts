// Load environment variables
import * as dotenv from 'dotenv';
dotenv.config();

// External dependencies
import 'tsconfig-paths/register';
import { Test, TestingModule } from '@nestjs/testing';

// Internal dependencies
import { AppModule } from '$src/app.module';
import getAccessToken from './getAccessToken.helper';

const setupTest = async (): Promise<void> => {
	const moduleFixture: TestingModule = await Test.createTestingModule({
		imports: [AppModule]
	}).compile();

	global.APP = moduleFixture.createNestApplication();
	await global.APP.init();
	global.SERVER = global.APP.getHttpServer();
	global.ACCESS_TOKEN = await getAccessToken();
};

export default setupTest;
