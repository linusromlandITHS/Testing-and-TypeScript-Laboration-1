Feature: Play a round of the game

Scenario: Start a new match, change the number of questions, start the game, and answer two questions
	Given I am logged in
	When I click on the "CREATE MATCH" button
	And I change the number of questions to 2
	And I click on the "START GAME" button
	And I answer the "first" question
	And I click on the "NEXT QUESTION" button
	And I answer the "second" question
	Then I should see that I won the quiz
	And I should see a "BACK HOME" button
