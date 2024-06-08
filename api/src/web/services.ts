import { DIContainer } from "rsdi";
import { IDIContainer } from "rsdi/dist/types";
import { UserService } from "src/application/services/usersService";
import { UsersController } from "./controller/users/usersController";
import { HashService } from "src/infrastructure/services/hashService";
import { TokenService } from "src/infrastructure/services/tokenService";
import { UserRepository } from "src/infrastructure/database/repositories/userRepository";
import { AuthenticationController } from "./controller/authentication/authenticationController";
import { AuthenticationService } from "src/application/services/authenticationService";
import { AppDataSource } from "src/data-source";
import { BoardsController } from "./controller/board/boardsController";
import { BoardRepository } from "src/infrastructure/database/repositories/boardRepository";
import { BoardsService } from "src/application/services/boardsService";
import { TasksController } from "./controller/tasks/tasksController";
import { TasksService } from "src/application/services/tasksService";
import { TaskRepository } from "src/infrastructure/database/repositories/taskRepository";
import { CloudStoreService } from "src/infrastructure/services/cloudStoreService";

export type AppDIContainer = ReturnType<typeof configureDI>;

export function configureDI(): IDIContainer {
  const container = new DIContainer()
    .add("hashService", () => new HashService())
    .add("tokenService", () => new TokenService())
    .add("dataSource", () => AppDataSource)
    .add("userRepository", ({ dataSource }) => new UserRepository(dataSource))
    .add(
      "userService",
      ({ userRepository, hashService }) =>
        new UserService(userRepository, hashService)
    )
    .add(
      "authenticationService",
      ({ userRepository, hashService, tokenService }) =>
        new AuthenticationService(userRepository, hashService, tokenService)
    )
    .add(
      "usersController",
      ({ userService }) => new UsersController(userService)
    )
    .add(
      "authenticationController",
      ({ authenticationService }) =>
        new AuthenticationController(authenticationService)
    )
    .add("boardRepositoy", ({ dataSource }) => new BoardRepository(dataSource))
    .add(
      "boardsService",
      ({ boardRepositoy, userRepository }) =>
        new BoardsService(boardRepositoy, userRepository)
    )
    .add(
      "boardsController",
      ({ boardsService }) => new BoardsController(boardsService)
    )
    .add("taskRepository", ({ dataSource }) => new TaskRepository(dataSource))
    .add("cloudStoreService", () => new CloudStoreService())
    .add(
      "tasksService",
      ({
        taskRepository,
        boardRepositoy,
        userRepository,
        cloudStoreService,
        hashService,
      }) =>
        new TasksService(
          taskRepository,
          boardRepositoy,
          userRepository,
          cloudStoreService,
          hashService
        )
    )
    .add(
      "tasksController",
      ({ tasksService }) => new TasksController(tasksService)
    );
  return container;
}
