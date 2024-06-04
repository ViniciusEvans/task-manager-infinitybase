import { DIContainer } from "rsdi";
import { IDIContainer } from "rsdi/dist/types";
import { UserService } from "src/application/services/usersService";
import { UsersController } from "./controller/users/usersController";
import { Application } from "express";
import { HashService } from "src/infrastructure/services/hashService";
import { TokenService } from "src/infrastructure/services/tokenService";
import { UserRepository } from "src/infrastructure/database/repositories/userRepository";
import { AuthenticationController } from "./controller/authentication/authenticationController";
import { AuthenticationService } from "src/application/services/authenticationService";

export type AppDIContainer = ReturnType<typeof configureDI>;

export function configureDI(): IDIContainer {
  const container = new DIContainer()
    .add("hashService", () => new HashService())
    .add("tokenService", () => new TokenService())
    .add("userRepository", () => new UserRepository())
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
    );
  return container;
}

export function configureRouter(app: Application, diContainer: AppDIContainer) {
  //@ts-ignore next-line
  const { usersController, authenticationController } = diContainer;

  app.route("/signup").post((req, res) => usersController.SignUp(req, res));
  app
    .route("/login")
    .post((req, res, next) => authenticationController.login(req, res, next));
  app
    .route("/refresh")
    .post((req, res, next) =>
      authenticationController.refreshAuth(req, res, next)
    );
}
