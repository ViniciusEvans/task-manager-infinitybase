import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Task } from "./Task";
import { Board } from "../Board/Board";

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
  constructor() {}
}
