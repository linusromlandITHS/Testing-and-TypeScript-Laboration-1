import 'tsconfig-paths/register';
import { AppModule } from '$src/app.module';
import { Test, TestingModule } from '@nestjs/testing';

const setupTest = async () => {
	const moduleFixture: TestingModule = await Test.createTestingModule({
		imports: [AppModule]
	}).compile();

	global.APP = moduleFixture.createNestApplication();
	await global.APP.init();
	global.SERVER = global.APP.getHttpServer();
};

export default setupTest;
