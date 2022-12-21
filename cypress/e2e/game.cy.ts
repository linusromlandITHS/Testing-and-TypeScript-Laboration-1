describe('Prueba game', () => {
	beforeEach(() => {
		cy.loginToAuth0(Cypress.env('auth0_username'), Cypress.env('auth0_password'));
	});

	it('Plays a round', () => {
		//Start a new match
		cy.get('button').contains('CREATE MATCH').click();

		//Change number of questions to 2
		cy.get('input[placeholder="Number of questions"]').type('{selectall}2');

		//Start the game
		cy.get('button').contains('START GAME').click();

		cy.answerQuestion();

		cy.get('button').contains('NEXT QUESTION').click();

		cy.answerQuestion();

		cy.get('h3')
			.contains(Cypress.env('auth0_username') + ' won the quiz!')
			.should('exist');
	});
});
