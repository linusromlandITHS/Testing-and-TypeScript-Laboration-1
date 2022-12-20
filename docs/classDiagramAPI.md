# UML Class Diagram API

```mermaid
classDiagram
    %% Startup function
    class main{
      +bootstrap()
    }

    %% Main Module
    class AppModule

    %% Guards
    class AuthGuard{
      +canActivate(ExecutionContext context) Promise~boolean~
    }
    AuthGuard --|> main

    class HealthModule
    class HealthController{
        -constructor(HealthService healthService)
        +getHealth() Promise~HealthCheckResult~
    }
    class HealthService{
        +getHealth() Promise~HealthCheckResult~
    }

    class OptionsModule
    class OptionsController{
        -constructor(OptionsService optionsService)
        +getOptions() Promise~GameOptions~
    }
    class OptionsService{
        +getOptions() Promise~GameOptions~
    }

    class GameModule
    class GameController{
        -constructor(GameService gameService)
        +createGame(string token) Promise~GameInformation~
        +joinGame(string token, string gameId) Promise~GameInformation~
        +gameExists(string token, string gameId) Promise~boolean~
    }
    class GameGateway{
        -constructor(GameService gameService)
        -function[] events
        +handleMessage(Socket client, WebSocketEvent data) Promise~GameInformation | void~
        +handleDisconnect(Socket client) Promise~void~
    }
    class GameService{
        -GameInformation[] _games
        +createGame(string token) Promise~GameInformation~
        +joinGame(string token, string gameId, Player user?) Promise~GameInformation~
        +gameExists(string token, string gameId) Promise~boolean~
        +leaveGame(string token, Socket client) Promise~void~
        +changeSettings(WebSocketEvent data, Player user) Promise~GameInformation~
        +changePlayerStatus(WebSocketEvent data, Player user) Promise~GameInformation~
        +answerQuestion(WebSocketEvent data, Player user) Promise~void~
        +nextQuestion(WebSocketEvent data, Player user, Socket client) Promise~GameInformation | void~
        +startGame(WebSocketEvent data, Player user, Socket client) Promise~GameInformation | void~
        +changeToLeaderboard(boolean endGame, string gamePin, Socket client)
    }

    %% Relations
    main <|-- AppModule
    AppModule <|-- HealthModule
    AppModule <|-- OptionsModule
    AppModule <|-- GameModule

    HealthModule <|-- HealthController
    HealthModule <|-- HealthService

    HealthService --|> HealthController

    OptionsModule <|-- OptionsController
    OptionsModule <|-- OptionsService

    OptionsService --|> OptionsController

    GameModule <|-- GameController
    GameModule <|-- GameService

    GameService --|> GameGateway
    GameService --|> GameController
    GameModule <|-- GameGateway
```
