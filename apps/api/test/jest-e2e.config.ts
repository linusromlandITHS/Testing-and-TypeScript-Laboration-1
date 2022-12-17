import type { Config } from 'jest';

import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from '../tsconfig.json';

const config: Config = {
	moduleFileExtensions: ['js', 'json', 'ts'],
	rootDir: '.',
	testEnvironment: 'node',
	testRegex: '.e2e-spec.ts$',
	transform: {
		'^.+\\.(t|j)s$': 'ts-jest'
	},
	globalSetup: '<rootDir>/helpers/setup.helper.ts',
	globalTeardown: '<rootDir>/helpers/teardown.helper.ts',
	moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/../' })
};

export default config;
