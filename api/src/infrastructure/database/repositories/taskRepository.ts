import { Attachment } from "src/domain/entities/Task/Attachment";
import { ITaskRepository } from "src/domain/entities/Task/ITaskRepository";
import { Task } from "src/domain/entities/Task/Task";
import { DataSource } from "typeorm";

export class TaskRepository implements ITaskRepository {
  constructor(private readonly dataSource: DataSource) {}

  async findTasks(boardId: string, query: string): Promise<Task[]> {
    return this.dataSource
      .getRepository(Task)
      .createQueryBuilder("task")
      .leftJoinAndSelect("task.user", "user")
      .where("task.title like :title", { title: `%${query}%` })
      .where("task.board_id = :boardId", { boardId })
      .getMany();
  }

  async store(task: Task): Promise<void> {
    await this.dataSource.getRepository(Task).save(task);
    await this.dataSource.getRepository(Attachment).save(task.attachments);
  }
}
