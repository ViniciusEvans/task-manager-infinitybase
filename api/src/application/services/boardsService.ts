import { InvalidArgument } from "src/domain/commom/ApplicationLayerException";
import { Board } from "src/domain/entities/Board/Board";
import { IBoardRepository } from "src/domain/entities/Board/IBoardRepository";
import { UserPermissionLevel } from "src/domain/entities/Board/UserRole";
import { IUserRepository } from "src/domain/entities/User/IUserRepository";

export class BoardsService {
  constructor(
    private readonly boardRepository: IBoardRepository,
    private readonly userRepository: IUserRepository
  ) {}

  async getAllBoardsFromUser(userId: string) {
    return this.boardRepository.findBoardsByUserId(userId);
  }

  async createBoards(userId: string, title: string) {
    const user = await this.userRepository.getUserById(userId);

    if (!user) {
      throw new InvalidArgument("User not found", 404);
    }

    const newBoard = new Board(title);
    newBoard.setOwner(user, newBoard);
    newBoard.setTaskStatus();

    await this.boardRepository.store(newBoard);

    return newBoard;
  }

  async addUserToBoard(
    userId: string,
    userToAddEmail: string,
    boardId: string,
    permissionLevel: UserPermissionLevel
  ) {
    const user = await this.userRepository.getUserById(userId);
    const userToAdd = await this.userRepository.getUserByEmail(userToAddEmail);

    if (!user || !userToAdd) {
      throw new InvalidArgument("User not found", 404);
    }

    const board = await this.boardRepository.findBoardById(boardId);

    if (!board) {
      throw new InvalidArgument("Board not found", 404);
    }

    if (!board.usersRole.find((userRole) => userRole.user.id === userId)) {
      throw new InvalidArgument("User don't belong to the board", 401);
    }

    const userAdminInBoard = board.usersRole.find(
      (userRole) => userRole.user.id === userId
    );

    if (!userAdminInBoard) {
      throw new InvalidArgument("User don't belong to this board", 401);
    }

    if (userAdminInBoard.userPermissionLevel !== UserPermissionLevel.ADMIN) {
      throw new InvalidArgument("Only admin can add user", 401);
    }

    if (board.usersRole.find((userRole) => userRole.user.id === userToAdd.id)) {
      throw new InvalidArgument("user already added", 400);
    }

    board.addUser(userToAdd, board, permissionLevel);

    await this.boardRepository.store(board);

    return { id: userToAdd.id, name: userToAdd.name };
  }

  async removeUserFromBoard(
    userAdminId: string,
    userToRemoveId: string,
    boardId: string
  ) {
    const userAdmin = await this.userRepository.getUserById(userAdminId);
    const userToRemove = await this.userRepository.getUserById(userToRemoveId);

    if (!userAdmin || !userToRemove) {
      throw new InvalidArgument("User not found", 404);
    }

    const board = await this.boardRepository.findBoardById(boardId);

    if (!board) {
      throw new InvalidArgument("board not found", 404);
    }

    if (
      !board.usersRole.find((userRole) => userRole.user.id === userToRemove.id)
    ) {
      throw new InvalidArgument("User don't belong to the board", 401);
    }

    const userAdminInBoard = board.usersRole.find(
      (userRole) => userRole.user.id === userAdmin.id
    );

    if (!userAdminInBoard) {
      throw new InvalidArgument("User don't belong to this board", 401);
    }

    if (userAdminInBoard.userPermissionLevel !== UserPermissionLevel.ADMIN) {
      throw new InvalidArgument("Only admin can remove user", 401);
    }

    await this.boardRepository.removeUserRole(board.getUser(userToRemove.id)!);
  }

  async changePermissionLevel(
    userAdminId: string,
    userToChangeId: string,
    boardId: string,
    permissionLevel: UserPermissionLevel
  ) {
    const userAdmin = await this.userRepository.getUserById(userAdminId);
    const userToChange = await this.userRepository.getUserById(userToChangeId);

    if (!userAdmin || !userToChange) {
      throw new InvalidArgument("User not found", 404);
    }

    const board = await this.boardRepository.findBoardById(boardId);

    if (!board) {
      throw new InvalidArgument("Board not found", 404);
    }

    if (
      !board.usersRole.find((userRole) => userRole.user.id === userToChange.id)
    ) {
      throw new InvalidArgument("User don't belong to the board", 401);
    }

    const userAdminInBoard = board.usersRole.find(
      (userRole) => userRole.user.id === userAdmin.id
    );

    if (!userAdminInBoard) {
      throw new InvalidArgument("User don't belong to this board", 401);
    }

    if (userAdminInBoard.userPermissionLevel !== UserPermissionLevel.ADMIN) {
      throw new InvalidArgument("Only admin can add user", 401);
    }

    board.editUserPermission(permissionLevel, userToChange.id);

    await this.boardRepository.store(board);
  }

  async getBoard(boardId: string, userId: string) {
    const board = await this.boardRepository.findBoardByUserIdAndBoardId(
      userId,
      boardId
    );

    if (!board) {
      throw new InvalidArgument("board not found", 404);
    }
    const formattedBoard = {
      ...board,
      usersRole: board.usersRole.map((userRole) => ({
        ...userRole,
        user: { id: userRole.user.id, name: userRole.user.name },
      })),
      tasks: board.tasks.map((task) => ({
        ...task,
        user: { id: task.user.id, name: task.user.name },
      })),
    };
    return formattedBoard;
  }

  async getBoardTaskStatus(boardId: string, userId: string) {
    const board = await this.boardRepository.findBoardByUserIdAndBoardId(
      userId,
      boardId
    );

    if (!board) {
      throw new InvalidArgument("board not found", 404);
    }

    return board.taskStatus;
  }

  async editTaskStatus(
    boardId: string,
    userId: string,
    statusId: string,
    status: string
  ) {
    const board = await this.boardRepository.findBoardByUserIdAndBoardId(
      userId,
      boardId
    );

    if (!board) {
      throw new InvalidArgument("board not found", 404);
    }

    if (
      board.usersRole.find((role) => role.user.id === userId)
        ?.userPermissionLevel !== UserPermissionLevel.ADMIN
    ) {
      throw new InvalidArgument("Only admin can edit task status", 401);
    }

    board.taskStatus.map((taskStatus) => {
      if (taskStatus.id === statusId) {
        taskStatus.status = status;
      }

      return taskStatus;
    });

    await this.boardRepository.store(board);

    return board.taskStatus.map((taskStatus) => ({
      id: taskStatus.id,
      status: taskStatus.status,
    }));
  }

  async getBoardUsers(boardId: string, userId: string) {
    const board = await this.boardRepository.findBoardByUserIdAndBoardId(
      userId,
      boardId
    );

    if (!board) {
      throw new InvalidArgument("board not found", 404);
    }

    if (
      board.usersRole.find((role) => role.user.id === userId)
        ?.userPermissionLevel !== UserPermissionLevel.ADMIN
    ) {
      throw new InvalidArgument("Only admin can edit task status", 401);
    }
    
    const boardUsers = await this.boardRepository.findBoardById(boardId);

    return boardUsers?.usersRole.map((role) => ({
      id: role.user.id,
      name: role.user.name,
    }));
  }
}
