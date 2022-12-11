import type { Config } from 'jest';

export default async (): Promise<Config> => {
	return {
		testRegex: '.*\\.spec\\.tsx$',
		testEnvironment: 'jsdom'
	};
};
