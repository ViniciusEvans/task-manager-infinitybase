import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Task } from "./Task";
import { Board } from "../Board/Board";
import { v4 as uuid } from "uuid";

@Entity({ name: "task_status" })
export class TaskStatus {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "text" })
  status!: string;

  @OneToMany(() => Task, (task) => task.taskStatus)
  task!: Task[];

  @ManyToOne(() => Board)
  board!: Board;
  constructor(status: string, board: Board) {
    this.id = uuid();
    this.status = status;
    this.board = board
  }
}
