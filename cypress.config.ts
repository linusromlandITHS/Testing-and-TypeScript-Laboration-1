// Configure dotenv
import { config } from 'dotenv';
config();

// External dependencies
import { defineConfig } from 'cypress';
import cucumber from 'cypress-cucumber-preprocessor';

export default defineConfig({
	env: {
		auth0_username: process.env.AUTH0_TEST_USERNAME,
		auth0_password: process.env.AUTH0_TEST_PASSWORD,
		auth0_domain: process.env.PUB_AUTH0_DOMAIN,
		APP_URL: 'http://127.0.0.1:3000/'
	},
	trashAssetsBeforeRuns: false,
	e2e: {
		specPattern: ['**/integration/**/*.ts', '**/e2e/**/*.ts'],
		setupNodeEvents(on) {
			on(
				'file:preprocessor',
				cucumber({
					typescript: require.resolve('typescript')
				})
			);
		}
	}
});
