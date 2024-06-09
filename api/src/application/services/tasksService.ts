import { InvalidArgument } from "src/domain/commom/ApplicationLayerException";
import { Attachment } from "src/domain/entities/Task/Attachment";
import { IBoardRepository } from "src/domain/entities/Board/IBoardRepository";
import { ITaskRepository } from "src/domain/entities/Task/ITaskRepository";
import { Task } from "src/domain/entities/Task/Task";
import { IUserRepository } from "src/domain/entities/User/IUserRepository";
import { ICloudStoreService } from "src/domain/services/ICloudStoreService";
import { IHashService } from "src/domain/services/IHashService";

export class TasksService {
  constructor(
    private readonly taskRepository: ITaskRepository,
    private readonly boardRepository: IBoardRepository,
    private readonly userRepsotory: IUserRepository,
    private readonly cloudStorageService: ICloudStoreService,
    private readonly hashService: IHashService
  ) {}

  async findTasks(boardId: string, userId: string, query: string) {
    const board = await this.boardRepository.findBoardByUserIdAndBoardId(
      userId,
      boardId
    );

    if (!board) {
      throw new InvalidArgument("user dont belong to this board", 401);
    }

    const tasks = await this.taskRepository.findTasks(boardId, query);

    const formattedTasks = tasks.map((task) => ({
      ...task,
      user: { id: task.user.id, name: task.user.name },
    }));
    return formattedTasks;
  }

  async createTask(
    boardId: string,
    title: string,
    description: string,
    statusId: string,
    userId: string,
    attachments: { fileExt: string; fileBuffer: Buffer }[]
  ) {
    const user = await this.userRepsotory.getUserById(userId);
    const board = await this.boardRepository.findBoardByUserIdAndBoardId(
      userId,
      boardId
    );

    if (!user) {
      throw new InvalidArgument("user not found", 404);
    }
    if (!board) {
      throw new InvalidArgument("user dont belong to this board", 401);
    }

    const taskStatus = board.taskStatus.find(
      (taskStatus) => taskStatus.id === statusId
    );

    let files = [];

    for (const file of attachments) {
      const buffer = Buffer.from(file.fileBuffer);
      const fileName = this.hashService.hashBinary(buffer);

      const upload = await this.cloudStorageService.uploadFile(
        fileName + file.fileExt,
        buffer
      );
      files.push(upload);
    }
    const task = new Task(title, description, user, board, taskStatus!);

    const attachmentArr: Attachment[] = [];
    for (const file of files) {
      attachmentArr.push(new Attachment(file, task));
    }

    task.setAttachments(attachmentArr);

    await this.taskRepository.store(task);

    return {
      id: task.id,
      title: task.title,
      taskStatus: task.taskStatus,
      user: { id: user.id, name: user.name },
    };
  }

  async editTask(
    taskId: string,
    boardId: string,
    title: string,
    description: string,
    statusId: string,
    userId: string,
    attachments: { id: string; fileName: string }[]
  ) {
    const user = await this.userRepsotory.getUserById(userId);
    const board = await this.boardRepository.findBoardByUserIdAndBoardId(
      userId,
      boardId
    );
    const task = await this.taskRepository.findTaskById(taskId);

    if (!user) {
      throw new InvalidArgument("user not found", 404);
    }
    if (!board) {
      throw new InvalidArgument("user dont belong to this board", 401);
    }
    if (!task) {
      throw new InvalidArgument("Task not found", 404);
    }

    const taskStatus = board.taskStatus.find(
      (taskStatus) => taskStatus.id === statusId
    );

    task.editTask(
      title,
      description,
      taskStatus!,
      attachments as unknown as Attachment[]
    );

    await this.taskRepository.store(task);

    return {
      id: task.id,
      title: task.title,
      taskStatus: task.taskStatus,
      user: { id: user.id, name: user.name },
    };
  }

  async getOne(userId: string, taskId: string, boardId: string) {
    const user = await this.userRepsotory.getUserById(userId);
    const board = await this.boardRepository.findBoardByUserIdAndBoardId(
      userId,
      boardId
    );
    const task = await this.taskRepository.findTaskById(taskId);

    if (!user) {
      throw new InvalidArgument("user not found", 404);
    }
    if (!board) {
      throw new InvalidArgument("user dont belong to this board", 401);
    }
    if (!task) {
      throw new InvalidArgument("Task not found", 404);
    }

    return task;
  }
}
