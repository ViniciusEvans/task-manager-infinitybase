import { Task } from "../Task/Task";
import { User } from "../User/User";
import { UserRole } from "./UserRole";

export class Board {
  constructor() {}

  Tasks!: Task[];
  Users!: User[];
  UsersRole!: UserRole[];
}
