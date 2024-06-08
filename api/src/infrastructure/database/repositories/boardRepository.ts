import { Board } from "src/domain/entities/Board/Board";
import { IBoardRepository } from "src/domain/entities/Board/IBoardRepository";
import { UserRole } from "src/domain/entities/Board/UserRole";
import { DataSource } from "typeorm";

export class BoardRepository implements IBoardRepository {
  constructor(private readonly dataSource: DataSource) {}

  async findBoardByUserIdAndBoardId(
    userId: string,
    boardId: string
  ): Promise<Board | null> {
    return this.dataSource
      .getRepository(Board)
      .createQueryBuilder("board")
      .leftJoinAndSelect("board.usersRole", "users_role")
      .leftJoinAndSelect("board.taskStatus", "task_status")
      .leftJoinAndSelect("users_role.user", "user")
      .leftJoinAndSelect("board.tasks", "tasks")
      .leftJoinAndSelect("tasks.user", "task_user")
      .leftJoinAndSelect("tasks.taskStatus", "task_task_status")
      .where("board.id = :boardId", { boardId })
      .andWhere("users_role.user_Id = :userId", { userId })
      .getOne();
  }

  async findBoardsByUserId(userId: string): Promise<Board[]> {
    return this.dataSource
      .getRepository(Board)
      .find({ where: { usersRole: { user: { id: userId } } } });
  }

  async store(board: Board): Promise<void> {
    await this.dataSource.getRepository(Board).save(board);
    await this.dataSource.getRepository(UserRole).save(board.usersRole);
  }

  async removeUserRole(userRole: UserRole): Promise<void> {
    await this.dataSource.getRepository(UserRole).remove(userRole)
  }

  async findBoardById(boardId: string): Promise<Board | null> {
    return this.dataSource
      .getRepository(Board)
      .createQueryBuilder("board")
      .leftJoinAndSelect("board.usersRole", "users_role")
      .leftJoinAndSelect("users_role.user", "user")
      .where("board.id = :boardId", { boardId })
      .getOne();
  }
}
