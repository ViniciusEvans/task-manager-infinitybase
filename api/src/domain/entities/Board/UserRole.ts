import { User } from "../User/User";
import { Board } from "./Board";

export class UserRole {
  User!: User;
  Board!: Board;
  UserPermissionLevel!: UserPermissionLevel;
}

enum UserPermissionLevel {
  OWNER = "OWNER",
  ADMIN = "ADMIN",
  VIEWER = "VIEWER",
}
