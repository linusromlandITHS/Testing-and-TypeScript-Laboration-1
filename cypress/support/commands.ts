/// <reference types="cypress" />

// Auth0 Authentication (source https://docs.cypress.io/guides/end-to-end-testing/auth0-authentication)
function loginViaAuth0Ui(username: string, password: string) {
	// App landing page with auth0 popup.
	cy.visit('http://127.0.0.1:3000');

	// Login on Auth0.
	cy.origin(Cypress.env('auth0_domain'), { args: { username, password } }, ({ username, password }) => {
		cy.get('input#username').type(username);
		cy.get('input#password').type(password, { log: false });

		cy.contains('button[value=default]', 'Continue').click();

		//If accept button is visible, click it
		cy.get('button[value=accept]').then(($btn) => {
			if ($btn.is(':visible')) {
				cy.get('button[value=accept]').click();
			}
		});
	});

	// Ensure Auth0 has redirected us back to the RWA.
	cy.url().should('equal', 'http://127.0.0.1:3000/');
}

Cypress.Commands.add('loginToAuth0', (username: string, password: string) => {
	const log = Cypress.log({
		displayName: 'AUTH0 LOGIN',
		message: [`🔐 Authenticating | ${username}`],
		autoEnd: false
	});
	log.snapshot('before');

	loginViaAuth0Ui(username, password);

	log.snapshot('after');
	log.end();
});
