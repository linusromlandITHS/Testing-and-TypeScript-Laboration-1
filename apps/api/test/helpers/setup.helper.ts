// Load environment variables
import * as dotenv from 'dotenv';
dotenv.config();

// External dependencies
import 'tsconfig-paths/register';
import { Test, TestingModule } from '@nestjs/testing';

// Internal dependencies
import { AppModule } from '$src/app.module';
import getAccessToken from './getAccessToken.helper';

const JEST_TEST_PORT: number = Number(process.env.JEST_TEST_PORT) || 30001;

const setupTest = async (): Promise<void> => {
	const moduleFixture: TestingModule = await Test.createTestingModule({
		imports: [AppModule]
	}).compile();

	global.APP = moduleFixture.createNestApplication();
	await global.APP.listen(JEST_TEST_PORT);
	global.SERVER = global.APP.getHttpServer();
	global.ACCESS_TOKEN = await getAccessToken();
	global.PORT = JEST_TEST_PORT;
};

export default setupTest;
