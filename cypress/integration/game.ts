/// <reference types="Cypress" />
import './game.feature';
import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

Given('I am logged in', () => {
	cy.loginToAuth0(Cypress.env('auth0_username'), Cypress.env('auth0_password'));
});

When('I click on the {string} button', (buttonText) => {
	cy.get('button').contains(buttonText).click();
});

When('I change the number of questions to {int}', (numQuestions) => {
	cy.get('input[placeholder="Number of questions"]').type('{selectall}' + numQuestions);
	cy.wait(1000);
});

When('I answer the {string} question', () => {
	cy.answerQuestion();
});

Then('I should see that I won the quiz', () => {
	cy.get('h3')
		.contains(Cypress.env('auth0_username') + ' won the quiz!')
		.should('exist');
});

Then('I should see a {string} button', (buttonText) => {
	cy.get('button').contains(buttonText).should('exist');
});
