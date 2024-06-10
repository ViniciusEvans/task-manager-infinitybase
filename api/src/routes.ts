// @ts-nocheck
import { Application } from "express";
import { AppDIContainer } from "./web/services";
import { authorization } from "./web/middlewares/authorization";

export function configureRouter(app: Application, diContainer: AppDIContainer) {
  const {
    usersController,
    authenticationController,
    boardsController,
    tasksController,
  } = diContainer;

  app.use(authorization);
  app
    .route("/auth/signup")
    .post((req, res) => usersController.signup(req, res));
  app
    .route("/auth/login")
    .post((req, res) => authenticationController.login(req, res));
  app
    .route("/auth/refresh")
    .post((req, res) => authenticationController.refreshAuth(req, res));

  app
    .route("/boards")
    .get((req, res) => boardsController.getAllBoardsFromUser(req, res));
  app
    .route("/board")
    .post((req, res) => boardsController.createBoard(req, res));
  app
    .route("/board/add-user")
    .post((req, res) => boardsController.addUserToBoard(req, res));
  app
    .route("/board/remove-user")
    .delete((req, res) => boardsController.removeUserFromBoard(req, res));
  app
    .route("/board/change-user-permission")
    .put((req, res) => boardsController.changeTheUserPErmission(req, res));
  app
    .route("/board/:id")
    .get((req, res) => boardsController.getBoard(req, res));
  app
    .route("/tasks")
    .post((req, res) => tasksController.getTasksFromBoard(req, res));
  app.route("/task").post((req, res) => tasksController.createTask(req, res));
  app.route("/task").put((req, res) => tasksController.editTask(req, res));
  app.route("/task").get((req, res) => tasksController.getOne(req, res));
  app.route("/board/task-status/:id").get((req, res) => boardsController.getBoardStatus(req, res));
  app.route("/board/task-status").put((req, res) => boardsController.editTaskStatus(req, res));
  app.route("/board/users/:id").get((req, res) => boardsController.getBoardUsers(req, res));
}
