describe('empty spec', () => {
	beforeEach(() => cy.loginToAuth0(Cypress.env('auth0_username'), Cypress.env('auth0_password')));

	it('passes', () => {});
});
