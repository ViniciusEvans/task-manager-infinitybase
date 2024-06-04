import { Attachment } from "../Attachment/Attachment";
import { Board } from "../Board/Board";
import { User } from "../User/User";

export class Task {
  constructor() {}

  Title!: string;
  Status!: TaskStatus;
  Description!: string;
  User!: User;
  Board!: Board;
  Attachments!: Attachment[];
}

export enum TaskStatus {
  Completed = "Completed",
  InProgress = "InProgress",
  ToDo = "ToDo",
}
