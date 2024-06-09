import { TasksService } from "src/application/services/tasksService";
import { Response, Request } from "express";
import { InvalidArgument } from "src/domain/commom/ApplicationLayerException";

export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  async getTasksFromBoard(req: Request, res: Response) {
    const { search } = req.query;
    const { boardId } = req.body;
    //@ts-ignore next-line
    const { id: userId } = req.currentUser;

    if (!boardId) {
      throw new InvalidArgument("boardId must be provided", 400);
    }

    const tasks = await this.tasksService.findTasks(
      boardId,
      userId,
      search as string
    );

    return res.status(200).send(tasks);
  }

  async editTask(req: Request, res: Response) {
    const { boardId, title, description, statusId, attachments, taskId } =
      req.body;
    //@ts-ignore next-line
    const { id: userId } = req.currentUser;

    if (!boardId) {
      throw new InvalidArgument("boardId must be provided", 400);
    }
    if (!title) {
      throw new InvalidArgument("title must be provided", 400);
    }
    if (!description) {
      throw new InvalidArgument("description must be provided", 400);
    }
    if (!statusId) {
      throw new InvalidArgument("statusId must be provided", 400);
    }

    const task = await this.tasksService.editTask(
      taskId,
      boardId,
      title,
      description,
      statusId,
      userId,
      attachments
    );

    return res.status(200).send(task);
  }

  async createTask(req: Request, res: Response) {
    const { boardId, title, description, statusId, userId, attachments } =
      req.body;

    if (!boardId) {
      throw new InvalidArgument("boardId must be provided", 400);
    }
    if (!title) {
      throw new InvalidArgument("title must be provided", 400);
    }
    if (!description) {
      throw new InvalidArgument("description must be provided", 400);
    }
    if (!statusId) {
      throw new InvalidArgument("statusId must be provided", 400);
    }
    if (!userId) {
      throw new InvalidArgument("userId must be provided", 400);
    }

    const task = await this.tasksService.createTask(
      boardId,
      title,
      description,
      statusId,
      userId,
      attachments
    );

    return res.status(200).send(task);
  }

  async getOne(req: Request, res: Response) {
    const { boardId, taskId } = req.query;
    //@ts-ignore next-line
    const { id: userId } = req.currentUser;

    if (!boardId) {
      throw new InvalidArgument("boardId must be provided", 400);
    }
    if (!taskId) {
      throw new InvalidArgument("taskId must be provided", 400);
    }

    const task = await this.tasksService.getOne(
      userId,
      taskId as string,
      boardId as string
    );

    return res.status(200).send(task);
  }
}
