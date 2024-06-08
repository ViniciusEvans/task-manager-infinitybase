import { v4 as uuid } from "uuid";
import { Board } from "../Board/Board";
import { Task } from "../Task/Task";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UserRole } from "../Board/UserRole";

@Entity("user")
export class User {
  constructor(name: string, email: string, password: string) {
    this.id = uuid();
    this.name = name;
    this.password = password;
    this.email = email;
  }

  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "text" })
  name!: string;

  @Column({ type: "text" })
  password!: string;

  @Column({ type: "text" })
  email!: string;

  @OneToMany(() => Task, (task) => task.user)
  tasks!: Task[];

  @OneToMany(() => UserRole, (userRoles)=> userRoles.user)
  userRole!: UserRole[];
}
