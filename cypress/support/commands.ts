/// <reference types="cypress" />

// Internal dependencies
import { QUESTION_INTRO_TIME } from '../../packages/shared/src/constants';

// Auth0 Authentication (source https://docs.cypress.io/guides/end-to-end-testing/auth0-authentication)
function loginToAuth0(username: string, password: string) {
	// App landing page with auth0 popup.
	cy.visit(Cypress.env('APP_URL'));

	// Login on Auth0.
	cy.origin(Cypress.env('auth0_domain'), { args: { username, password } }, ({ username, password }) => {
		cy.get('input#username').type(username);
		cy.get('input#password').type(password, { log: false });

		cy.contains('button[value=default]', 'Continue').click();
	});

	// Ensure Auth0 has redirected us back to the RWA.
	cy.url().should('equal', Cypress.env('APP_URL'));
}

Cypress.Commands.add('loginToAuth0', (username: string, password: string) => {
	const log = Cypress.log({
		displayName: 'AUTH0 LOGIN',
		message: [`🔐 Authenticating | ${username}`],
		autoEnd: false
	});
	log.snapshot('before');

	loginToAuth0(username, password);

	log.snapshot('after');
	log.end();
});

Cypress.Commands.add('answerQuestion', () => {
	cy.wait(QUESTION_INTRO_TIME + 150);

	//Answer the first question by clicking on one of the 4 buttons randomly
	cy.get('button')
		.eq(Math.floor(Math.random() * 4))
		.click();

	cy.wait(QUESTION_INTRO_TIME + 150);

	//Check if the user can be found in the leaderboard
	cy.get('h3').contains(Cypress.env('auth0_username')).should('exist');
});
