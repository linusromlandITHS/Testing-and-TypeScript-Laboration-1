# Testing & Typescript Laboration

## Table of contents 📖

1. [Introduction](#introduction)
2. [Built with](#built-with-%EF%B8%8F)
3. [Getting started](#getting-started-)
   1. [Prerequisites](#prerequisites-)
   2. [Manually](#manually-%EF%B8%8F)
   3. [Docker](#docker-)
4. [Documentation](#documentation-)
   1. [UML Sequence Diagram](#uml-sequence-diagram)
   2. [UML Class Diagram API](#uml-class-diagram-api)
5. [License](#)

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

This guide will help you get the project up and running on your local machine, either using Docker or manually.

### Prerequisites 📋

If you want to run the project with docker you need to have the following installed:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

If you want to run the project without docker you need to have the following installed:

- [Node.js](https://nodejs.org/en/download/)

### Manually 🛠️

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

### Docker 🐳

1. Clone the repo

```sh
git clone https://github.com/linusromlandITHS/linus-romland-testing-typescript-quiz-app.git
```

2. Navigate to the repository

```sh
cd linus-romland-testing-typescript-quiz-app
```

3. Start the project

```sh
docker-compose up
```

The frontend will be available at [http://127.0.0.1:5173](http://127.0.0.1:5173) and the backend at [http://127.0.0.1:3000](http://127.0.0.1:3000).

## Documentation 📖

### UML Sequence Diagram

The UML Sequence Diagram can be found [here](docs/sequenceDiagram.md)

### UML Class Diagram API

The UML Class Diagram API can be found [here](docs/classDiagramAPI.md)

## License ⚠️

`linus-romland-testing-typescript-quiz-app` is free and open-source software licensed under the [THE BEERWARE LICENSE](LICENSE).
