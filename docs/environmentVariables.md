# Enivronment Variables

To setup the enivronment variables you need to create a `.env` file in the root of the project. You can use the `.env.example` file as a template.
All variables that are not required are optional and will use the default value if not set.

## Available variables

| Variable                     | Description                                        | Default               | Datatype                                                                        | Required                  |
| ---------------------------- | -------------------------------------------------- | --------------------- | ------------------------------------------------------------------------------- | ------------------------- |
| API_PORT                     | The port the api will run on                       | 3001                  | Number                                                                          | No                        |
| PUB_API_URL                  | The url of the api                                 | http://127.0.0.1:3001 | String                                                                          | No                        |
| CLIENT_PORT                  | The port the client will run on                    | 3000                  | Number                                                                          | No                        |
| PUB_AUTH0_DOMAIN             | The domain of your Auth0 application               | -                     | String                                                                          | Yes                       |
| PUB_AUTH0_CLIENT_ID          | The client id of your Auth0 application            | -                     | String                                                                          | Yes                       |
| AUTH0_CLIENT_SECRET          | The client secret of your Auth0 application        | -                     | String                                                                          | Yes                       |
| AUTH0_TEST_USERNAME          | The username of the test user                      | -                     | String                                                                          | No (Yes if running tests) |
| AUTH0_TEST_PASSWORD          | The password of the test user                      | -                     | String                                                                          | No (Yes if running tests) |
| DEFAULT_QUESTION_COUNT       | The default number of questions to fetch           | 10                    | Number                                                                          | No                        |
| DEFAULT_QUESTION_TIME        | The default time for each question                 | 30                    | Number                                                                          | No                        |
| DEFAULT_QUESTION_REGION      | The default region for questions                   | us                    | String ("us" or "se")                                                           | No                        |
| DEFAULT_QUESTION_DIFFICULTY  | The default difficulty for questions               | easy                  | String ("easy", "medium" or "hard")                                             | No                        |
| DEFAULT_QUESTION_CATEGORY    | The default category for questions                 | 9                     | String (allowed values found [here](https://the-trivia-api.com/api/categories)) | No                        |
| QUESTION_MAX_POSSIBLE_POINTS | The max possible points for a quiz question        | 1000                  | Number                                                                          | No                        |
| QUESTION_MAX_PLAYERS         | The max number of players for a quiz               | 5                     | Number                                                                          | No                        |
| JEST_TEST_PORT               | The port the server will run on when running tests | 30001                 | Number                                                                          | No                        |
