import { Attachment } from "src/domain/entities/Task/Attachment";
import { ITaskRepository } from "src/domain/entities/Task/ITaskRepository";
import { Task } from "src/domain/entities/Task/Task";
import { DataSource, ILike } from "typeorm";

export class TaskRepository implements ITaskRepository {
  constructor(private readonly dataSource: DataSource) {}

  async findTasks(boardId: string, query: string): Promise<Task[]> {
    return this.dataSource.getRepository(Task).find({
      where: { board: { id: boardId }, title: ILike(`%${query}%`) },
      relations: ["user", "taskStatus"],
    });
  }

  async store(task: Task): Promise<void> {
    await this.dataSource.getRepository(Task).save(task);
    await this.dataSource.getRepository(Attachment).save(task.attachments);
  }

  async findTaskById(id: string): Promise<Task | null> {
    return this.dataSource.getRepository(Task).findOne({
      where: { id },
      relations: ["user", "board", "attachments", "taskStatus"],
    });
  }
}
