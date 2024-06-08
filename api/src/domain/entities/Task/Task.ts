import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Board } from "../Board/Board";
import { User } from "../User/User";
import { TaskStatus } from "./TaskStatus";
import { v4 as uuid } from "uuid";
import { Attachment } from "./Attachment";

@Entity({ name: "task" })
export class Task {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "text" })
  title!: string;

  @Column({ type: "text" })
  description!: string;

  @ManyToOne(() => User, (user) => user.tasks)
  user!: User;

  @ManyToOne(() => Board)
  board!: Board;

  @ManyToOne(() => TaskStatus)
  taskStatus!: TaskStatus;

  @OneToMany(() => Attachment, (attachment) => attachment.task)
  attachments!: Attachment[];

  constructor(
    title: string,
    description: string,
    user: User,
    board: Board,
    taskStatus: TaskStatus
  ) {
    this.id = uuid();
    this.title = title;
    this.description = description;
    this.user = user;
    this.board = board;
    this.taskStatus = taskStatus;
  }
}
