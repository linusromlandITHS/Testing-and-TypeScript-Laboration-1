// Load environment variables
import * as dotenv from 'dotenv';
dotenv.config({
	path: '../../.env'
});

const PORT: number = Number(process.env.PORT) || 3000;
const AUTH0_DOMAIN: string = process.env.AUTH0_DOMAIN;
const AUTH0_CLIENT_ID: string = process.env.AUTH0_CLIENT_ID;
const AUTH0_CLIENT_SECRET: string = process.env.AUTH0_CLIENT_SECRET;
const AUTH0_TEST_USERNAME: string = process.env.AUTH0_TEST_USERNAME;
const AUTH0_TEST_PASSWORD: string = process.env.AUTH0_TEST_PASSWORD;
const DEFAULT_QUESTION_COUNT: number = Number(process.env.DEFAULT_QUESTION_COUNT) || 10;
const DEFAULT_QUESTION_TIME: number = Number(process.env.DEFAULT_QUESTION_TIME) || 30;
const DEFAULT_QUESTION_REGION: string = process.env.DEFAULT_QUESTION_REGION || 'SE';
const DEFAULT_QUESTION_DIFFICULTY: string = process.env.DEFAULT_QUESTION_DIFFICULTY || 'easy';
const DEFAULT_QUESTION_CATEGORY: string = process.env.DEFAULT_QUESTION_CATEGORY || 'movies';
const QUESTION_MAX_POSSIBLE_POINTS: number = Number(process.env.QUESTION_MAX_POSSIBLE_POINTS) || 1000;
const JEST_TEST_PORT: number = Number(process.env.JEST_TEST_PORT) || 30001;

export {
	PORT,
	AUTH0_DOMAIN,
	AUTH0_CLIENT_ID,
	AUTH0_CLIENT_SECRET,
	AUTH0_TEST_USERNAME,
	AUTH0_TEST_PASSWORD,
	DEFAULT_QUESTION_COUNT,
	DEFAULT_QUESTION_TIME,
	DEFAULT_QUESTION_REGION,
	DEFAULT_QUESTION_DIFFICULTY,
	DEFAULT_QUESTION_CATEGORY,
	QUESTION_MAX_POSSIBLE_POINTS,
	JEST_TEST_PORT
};
