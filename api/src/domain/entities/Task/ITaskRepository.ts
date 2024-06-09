import { Task } from "./Task";

export interface ITaskRepository {
  findTasks(boardId: string, query: string): Promise<Task[]>;
  store(task: Task): Promise<void>;
  findTaskById(taskId: string): Promise<Task  | null>
}
