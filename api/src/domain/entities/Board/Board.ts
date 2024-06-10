import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Task } from "../Task/Task";
import { UserPermissionLevel, UserRole } from "./UserRole";
import { v4 as uuid } from "uuid";
import { User } from "../User/User";
import { TaskStatus } from "../Task/TaskStatus";

@Entity("board")
export class Board {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "text" })
  name!: string;

  @OneToMany(() => Task, (task) => task.board)
  tasks!: Task[];

  @OneToMany(() => UserRole, (userRole) => userRole.board)
  usersRole!: UserRole[];

  @OneToMany(() => TaskStatus, (taskStatus) => taskStatus.board)
  taskStatus!: TaskStatus[];

  constructor(name: string) {
    this.id = uuid();
    this.name = name;
  }

  setOwner(user: User, board: Board) {
    this.usersRole = [];
    this.usersRole.push(new UserRole(user, board, UserPermissionLevel.ADMIN));
  }

  addUser(user: User, board: Board, userPermissionLevel: UserPermissionLevel) {
    if (!this.usersRole) {
      this.usersRole = [];
    }
    this.usersRole.push(new UserRole(user, board, userPermissionLevel));
  }

  getUser(userId: string) {
    return this.usersRole.find((user) => user.user.id === userId);
  }

  editUserPermission(userPermissionLevel: UserPermissionLevel, userId: string) {
    const userRole = this.getUser(userId);

    if (!userRole) {
      return;
    }
    userRole.changePermission(userPermissionLevel);
  }

  setTaskStatus() {
    this.taskStatus = [];
    this.taskStatus.push(
      new TaskStatus("TO DO", this),
      new TaskStatus("IN PROGRESS", this),
      new TaskStatus("COMPLETED", this)
    );
  }
}
