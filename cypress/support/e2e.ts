// Import commands
import './commands';

// Logs all uncaught exceptions to the console
Cypress.on('uncaught:exception', (err) => {
	return false;
});
