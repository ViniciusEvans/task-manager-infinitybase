import { User } from "../User/User";
import { Board } from "./Board";
import { UserRole } from "./UserRole";

export interface IBoardRepository {
  findBoardsByUserId(userId: string): Promise<Board[]>;
  findBoardByUserIdAndBoardId(
    userId: string,
    boardId: string
  ): Promise<Board | null>;
  store(board: Board): Promise<void>;
  findBoardById(boardId: string): Promise<Board | null>;
  removeUserRole(userRole: UserRole): Promise<void>;
}
