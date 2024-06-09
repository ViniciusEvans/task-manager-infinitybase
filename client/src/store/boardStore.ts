import { create } from 'zustand'

type CreateBoardModalState = {
    showCreateBoardModal: boolean
    setShowCreateBoardModal: () => void
}

type User = {
    id: string
    name: string
}

enum EUserPermissionLevel {
    ADMIN = 'ADMIN',
    USER = 'USER'
}

type UserRole = {
    userPermissionLevel: EUserPermissionLevel
    id: string
    user: User
}

export type Attachment = {
    id: string
    attachmentUrl: string
}

type Task = {
    id: string
    title: string
    taskStatus: TaskStatus
    description: string
    user: User
    attachments: Attachment[] | { fileExt: string; fileBuffer: Buffer }[]
}

type TaskStatus = { id: string; status: string }

type Board = { id: string; name: string; usersRole: UserRole[]; taskStatus: TaskStatus[]; tasks: Task[] }

type BoardsState = {
    boards: Board[]
    setBoards: (boards: Board[]) => void
    addBoard: (newBoard: { id: string; name: string }) => void
}

type DashboardState = {
    board: Board
    setDashboard: (board: Board) => void
    addTask: (task: Task) => void
    setTasks: (task: Task[]) => void
}

type CreateTaskModalState = {
    showCreateTaskModal: boolean
    setShowCreateTaskModal: () => void
}
type ViewTaskModalState = {
    showViewTaskModal: boolean
    setShowViewTaskModal: () => void
}

type TaskFormDataState = {
    task: Task & { boardId: string }
    setTask: (task: Task & { boardId: string }) => void
    resetTask: () => void
}

export const useCreateBoardModal = create<CreateBoardModalState>((set) => ({
    showCreateBoardModal: false,
    setShowCreateBoardModal: () => set((state) => ({ ...state, showCreateBoardModal: !state.showCreateBoardModal }))
}))

export const useBoardsStores = create<BoardsState>((set) => ({
    boards: [],
    addBoard: (newBoard: { id: string; name: string }) =>
        set((state) => ({ ...state, boards: [...state.boards, { ...newBoard, tasks: [], taskStatus: [], users: [], usersRole: [] }] })),
    setBoards: (boards: Board[]) => set((state) => ({ ...state, boards: [...boards] }))
}))

export const useDashboardStore = create<DashboardState>((set) => ({
    board: { id: '', name: '', taskStatus: [], tasks: [], users: [], usersRole: [] },
    setDashboard: (board: Board) => set((state) => ({ ...state, board: board })),
    addTask: (task: Task) => set((state) => ({ ...state, board: { ...state.board, tasks: [...state.board.tasks, task] } })),
    setTasks: (tasks: Task[]) => set((state) => ({ ...state, board: { ...state.board, tasks: [...tasks] } }))
}))

export const useCreateTaskModal = create<CreateTaskModalState>((set) => ({
    showCreateTaskModal: false,
    setShowCreateTaskModal: () => set((state) => ({ ...state, showCreateTaskModal: !state.showCreateTaskModal }))
}))

export const useTaskFormData = create<TaskFormDataState>((set) => ({
    task: { id: '', title: '', taskStatus: { id: '', status: '' }, description: '', user: { id: '', name: '' }, boardId: '', attachments: [] },
    setTask: (task) => set((state) => ({ ...state, task: task })),
    resetTask: () =>
        set((state) => ({
            ...state,
            task: { id: '', title: '', taskStatus: { id: '', status: '' }, description: '', user: { id: '', name: '' }, boardId: '', attachments: [] }
        }))
}))

export const useViewTaskModal = create<ViewTaskModalState>((set) => ({
    showViewTaskModal: false,
    setShowViewTaskModal: () => set((state) => ({ ...state, showViewTaskModal: !state.showViewTaskModal }))
}))

export const useGetOneTaskStore = create<{ taskId: string; boardId: string; setStore: (taskId: string, boardId: string) => void }>((set) => ({
    taskId: '',
    boardId: '',
    setStore: (taskId, boardId) => set((state) => ({ ...state, taskId, boardId }))
}))
