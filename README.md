# Testing & Typescript Laboration

## Table of contents 📖

1. [Introduction](#introduction)
2. [Built with](#built-with-%EF%B8%8F)
3. [Getting started](#getting-started-)
   1. [Prerequisites](#prerequisites-)
   2. [Setup](#setup-%EF%B8%8F)
4. [Tests](#tests-)
   1. [Unit tests](#unit-tests)
   2. [End-to-end tests](#end-to-end-tests)
   3. [BDD tests](#bdd-tests)
5. [Documentation](#documentation-)
   1. [Figma](#figma)
   2. [UML Sequence Diagram](#uml-sequence-diagram)
   3. [UML Class Diagram API](#uml-class-diagram-api)
   4. [Component Diagram Client](#component-diagram-client)
6. [License](#)

## Introduction

This project is a simple quiz-app where users can play quizes in both single & multiplayer, at the end of a game they get the results and statistics.

## Built with 🛠️

![Typescript](https://img.shields.io/badge/-Typescript-000000?style=for-the-badge&logo=typescript)
![Node.js](https://img.shields.io/badge/-Node.js-000000?style=for-the-badge&logo=node.js)
![React](https://img.shields.io/badge/-React-000000?style=for-the-badge&logo=react)
![Nest.js](https://img.shields.io/badge/-Nest.js-000000?style=for-the-badge&logo=nestjs)
![Docker](https://img.shields.io/badge/-Docker-000000?style=for-the-badge&logo=docker)
![Docker Compose](https://img.shields.io/badge/-Docker%20Compose-000000?style=for-the-badge&logo=docker)

## Getting Started 🚀

This guide will help you get the project up and running on your local machine.

### Prerequisites 📋

- [Node.js](https://nodejs.org/en/download/)
- [Auth0](docs/auth0/README.md)
- [Environment Variables](docs/environmentVariables.md)

To run the project you have to have Node.js installed, you can download it [here](https://nodejs.org/en/download/).

You also **NEED** to have `Auth0` & `Environment Variables` setup before running the project. A complete guide can be found [here](docs/auth0/README.md) & [here](docs/environmentVariables.md).

### Setup 🛠️

1. Clone the repo

```sh
git clone https://github.com/linusromlandITHS/linus-romland-testing-typescript-quiz-app.git
```

2. Navigate to the repository

```sh
cd linus-romland-testing-typescript-quiz-app
```

3. Install necessary dependencies

```sh
npm install
```

4. Start the project

```sh
npm run dev
```

The frontend will be available at [http://127.0.0.1:3000](http://127.0.0.1:3000) and the backend at [http://127.0.0.1:3001](http://127.0.0.1:3001).

## Tests 🧪

I have written both unit tests and end-to-end tests for this project. The unit tests are written in `Jest` and the end-to-end tests for the api are also written in `Jest` and the end-to-end tests for the client are written in `Cypress`.

To run all tests, you need to have installed and made sure the project can be started. See [Setup](#setup-%EF%B8%8F) for more information. Also make sure that you have set ut Auth0 with a test account and have the environment variables set up. See [Prerequisites](#prerequisites-) for more information.

**Note:** The tests could fail once in a while because of the connection to Auth0. Restarting the test should fix it.


### Unit tests

I have written unit tests for the api and the client. The unit tests for the api are written in `Jest` and the unit tests for the client are written in `React Testing Library`.
I have tested most of the functions and components. And also tested for invalid inputs, null values and so on. Some are tested with snapshots, some are tested with mock functions and some are tested with just rendering the component and checking if it renders correctly.

Some example of this is:

- [validateSettings.spec.ts](apps/api/src/utils/validateSettings.spec.ts)
- [validateWebSocketEvent.spec.ts](apps/api/src/utils/validateWebSocketEvent.spec.ts)
- [auth.guard.spec.ts](apps/api/src/guards/auth.guard.spec.ts)
- [Button.spec.tsx](apps/client/src/components/Button/Button.spec.tsx)
- [Modal.spec.tsx](apps/client/src/components/Modal/Modal.spec.tsx)
- [Card.spec.tsx](apps/client/src/routes/Landing/components/Card/Card.spec.tsx)
- [SettingInput.spec.tsx](apps/client/src/routes/Game/Lobby/components/SettingInput/SettingInput.spec.tsx)

**Run the tests**

To run the Units tests for the api, run the following command:

```sh
npm run test:unit -w api
```

To run the Units tests for the client, run the following command:

```sh
npm run test -w client
```

### End-to-end tests

I have written end-to-end tests for the api and the client. The end-to-end tests for the api are written in `Jest` and the end-to-end tests for the client are written in `Cypress`.

The API end-to-end tests are testing the api endpoints and checks if they return the correct status code and response. The client end-to-end tests are testing the client and checks if the client can navigate to the correct pages and if the client can play a round of the game.

The API end-to-end tests are found in the `apps/api/test/` directory and the client end-to-end tests are found in the `cypress/e2e/` directory.

**Run the tests**

To run the end-to-end tests for the api, run the following command:

```sh
npm run test:e2e -w api
```

It is not possible to run the end-to-end test for the client without also running the BDD tests. To run the end-to-end tests for the client, run the following command:

```sh
npm run cy:run
```

Please note that the end-to-end tests will fail if you do not have the project running. The frontend should be running at `http://127.0.0.1:3000` and the backend should be running at `http://127.0.0.1:3001`. See [Setup](#setup-%EF%B8%8F) for more information.

### BDD tests

I have written one BDD test that tests the whole flow of the game. The test is written in `Cypress` and cucumber. The test is found in the `cypress/integration/` directory.

**Run the tests**

To run the BDD tests, run the following command:

```sh
npm run cy:run
```

Please note that the BDD test will fail if you do not have the project running. The frontend should be running at `http://127.0.0.1:3000` and the backend should be running at `http://127.0.0.1:3001`. See [Setup](#setup-%EF%B8%8F) for more information.

## Documentation 📖

### Figma

The figma can be found [here](https://www.figma.com/file/cuS6InQjRn5unuer58cgD5/Testing-%26-Typescript-Laboration-1?node-id=7%3A367&t=DGA5jhKJV1e9mdjP-1).
(Demo can be found [here](https://www.figma.com/proto/cuS6InQjRn5unuer58cgD5/Testing-%26-Typescript-Laboration-1?node-id=7%3A368&scaling=min-zoom&page-id=7%3A367&starting-point-node-id=7%3A368&show-proto-sidebar=1))

### UML Sequence Diagram

The UML Sequence Diagram can be found [here](docs/sequenceDiagram.md).

### UML Class Diagram API

The UML Class Diagram API can be found [here](docs/classDiagramAPI.md).

### Component Diagram Client

The Component Diagram can be found [here](docs/componentDiagramClient.md).

## License ⚠️

`linus-romland-testing-typescript-quiz-app` is free and open-source software licensed under the [THE BEERWARE LICENSE](LICENSE).
