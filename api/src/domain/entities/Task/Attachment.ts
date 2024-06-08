import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Task } from "./Task";
import { v4 as uuid } from "uuid";

@Entity({ name: "attachments" })
export class Attachment {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "text" })
  attachmentUrl!: string;

  @ManyToOne(() => Task)
  task!: Task;
  constructor(attachmentUrl: string, task: Task) {
    this.id = uuid();
    this.attachmentUrl = attachmentUrl;
    this.task = task;
  }
}
