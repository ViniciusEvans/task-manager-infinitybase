import { Response, Request } from "express";
import { BoardsService } from "src/application/services/boardsService";
import { InvalidArgument } from "src/domain/commom/ApplicationLayerException";

export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  async getAllBoardsFromUser(req: Request, res: Response) {
    //@ts-ignore
    const { id: userId } = req.currentUser;

    const boards = await this.boardsService.getAllBoardsFromUser(userId);

    return res.status(200).send(boards);
  }

  async createBoard(req: Request, res: Response) {
    const { name } = req.body;
    //@ts-ignore next-line
    const { id: userId } = req.currentUser;

    if (!name) {
      throw new InvalidArgument("name must be provided", 400);
    }

    const board = await this.boardsService.createBoards(userId, name);

    return res.status(200).send({ id: board.id, name: board.name });
  }

  async addUserToBoard(req: Request, res: Response) {
    const { userToAddId, boardId, permissionLevel } = req.body;
    //@ts-ignore next-line
    const { id: userId } = req.currentUser;

    if (!userId) {
      throw new InvalidArgument("UserId must be provided", 400);
    }
    if (!userToAddId) {
      throw new InvalidArgument("userToAddId must be provided", 400);
    }
    if (!boardId) {
      throw new InvalidArgument("boardId must be provided", 400);
    }
    if (!permissionLevel) {
      throw new InvalidArgument("permissionLevel must be provided", 400);
    }

    await this.boardsService.addUserToBoard(
      userId,
      userToAddId,
      boardId,
      permissionLevel
    );

    return res.sendStatus(204);
  }

  async removeUserFromBoard(req: Request, res: Response) {
    const { userToRemoveId, boardId } = req.body;
    //@ts-ignore next-line
    const { id: userId } = req.currentUser;

    if (!userToRemoveId) {
      throw new InvalidArgument("userToRemoveId must be provided", 400);
    }

    if (!boardId) {
      throw new InvalidArgument("boardId must be provided", 400);
    }

    await this.boardsService.removeUserFromBoard(
      userId,
      userToRemoveId,
      boardId
    );

    res.sendStatus(200);
  }

  async changeTheUserPermission(req: Request, res: Response) {
    const { userToChangeId, boardId, permissionLevel } = req.body;
    //@ts-ignore next-line
    const { id: userId } = req.currentUser;

    if (!userToChangeId) {
      throw new InvalidArgument("userToChangeId must be provided", 400);
    }
    if (!boardId) {
      throw new InvalidArgument("userToChangeId must be provided", 400);
    }
    if (!permissionLevel) {
      throw new InvalidArgument("userToChangeId must be provided", 400);
    }

    await this.boardsService.changePermissionLevel(
      userId,
      userToChangeId,
      boardId,
      permissionLevel
    );

    return res.sendStatus(204);
  }

  async getBoard(req: Request, res: Response) {
    const { id: boardId } = req.params;
    //@ts-ignore next-line
    const { id: userId } = req.currentUser;

    if (!boardId) {
      throw new InvalidArgument("boardId must be provided", 400);
    }

    const board = await this.boardsService.getBoard(boardId, userId);

    return res.status(200).send(board);
  }

  async getBoardStatus(req: Request, res: Response) {
    const { id: boardId } = req.params;
    //@ts-ignore next-line
    const { id: userId } = req.currentUser;

    if (!boardId) {
      throw new InvalidArgument("BoardId must be provided", 400);
    }

    const taskStatus = await this.boardsService.getBoardTaskStatus(
      boardId,
      userId
    );

    return res.status(200).send(taskStatus);
  }

  async editTaskStatus(req: Request, res: Response) {
    const { boardId, status, statusId } = req.body;
    //@ts-ignore next-line
    const { id: userId } = req.currentUser;

    if (!boardId) {
      throw new InvalidArgument("BoardId must be provided", 400);
    }
    if (!statusId) {
      throw new InvalidArgument("statusId must be provided", 400);
    }
    if (!status) {
      throw new InvalidArgument("status must be provided", 400);
    }

    const taskStatus = await this.boardsService.editTaskStatus(
      boardId,
      userId,
      statusId,
      status
    );

    return res.status(200).send(taskStatus);
  }
}
