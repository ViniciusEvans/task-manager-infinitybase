import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../User/User";
import { Board } from "./Board";

export enum UserPermissionLevel {
  ADMIN = "ADMIN",
  USER = "USER",
}

@Entity("users_role")
export class UserRole {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => User, (user) => user.userRole)
  user!: User;

  @ManyToOne(() => Board, (board) => board.usersRole)
  board!: Board;

  @Column({ type: "enum", enum: UserPermissionLevel })
  userPermissionLevel!: UserPermissionLevel;

  constructor(
    user: User,
    board: Board,
    userPermissionLevel: UserPermissionLevel
  ) {
    this.user = user;
    this.board = board;
    this.userPermissionLevel = userPermissionLevel;
  }

  changePermission(userPermissionLevel: UserPermissionLevel) {
    this.userPermissionLevel = userPermissionLevel;
  }
}
