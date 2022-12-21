// Configure dotenv
import { config } from 'dotenv';
config();

// External dependencies
import { defineConfig } from 'cypress';
import fs from 'fs';
import _ from 'lodash';

export default defineConfig({
	env: {
		auth0_username: process.env.AUTH0_TEST_USERNAME,
		auth0_password: process.env.AUTH0_TEST_PASSWORD,
		auth0_domain: process.env.PUB_AUTH0_DOMAIN,
		APP_URL: 'http://127.0.0.1:3000/'
	},
	trashAssetsBeforeRuns: false,
	e2e: {
		setupNodeEvents(on) {
			on('after:spec', (_spec, results) => {
				if (results && results.video) {
					// Do we have failures for any retry attempts?
					const failures = _.some(results.tests, (test) => {
						return _.some(test.attempts, { state: 'failed' });
					});
					if (!failures) {
						// delete the video if the spec passed and no tests retried
						fs.unlinkSync(results.video);
					}
				}
			});

			on('task', {
				log(message) {
					console.log(message);

					return null;
				}
			});
		}
	}
});
