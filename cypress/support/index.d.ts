/// <reference types="cypress" />

declare namespace Cypress {
	interface Chainable<Subject = any> {
		/**
		 * Custom command to login with auth0
		 * @example cy.loginToAuth0()
		 */
		loginToAuth0(username: string, password: string): Chainable<null>;
	}
}
