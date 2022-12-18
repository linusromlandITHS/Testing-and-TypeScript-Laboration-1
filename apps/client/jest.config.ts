// External dependencies
import type { Config } from 'jest';
import { pathsToModuleNameMapper } from 'ts-jest';

// Internal dependencies
import { compilerOptions } from './tsconfig.json';

const config: Config = {
	testRegex: '.*\\.spec\\.tsx$',
	testEnvironment: 'jsdom',
	moduleNameMapper: {
		'\\.(css|less|scss|sass)$': 'identity-obj-proxy',
		'\\.(svg)$': '<rootDir>/test/mock/svg.mock.tsx',
		...pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' })
	},
	setupFilesAfterEnv: ['<rootDir>/test/helpers/setup.helper.ts']
};

export default config;
