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
    USER = 'USER',
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
    replaceTask: (task: Task ) => void
}

type CreateTaskModalState = {
    showTaskFormModal: boolean
    setShowTaskFormModal: (show: boolean) => void
}
type ViewTaskModalState = {
    showViewTaskModal: boolean
    setShowViewTaskModal: (show: boolean) => void
}

type TaskFormDataState = {
    isCreate: boolean
    task: Task & { boardId: string }
    setTask: (task: Task & { boardId: string }) => void
    resetTask: () => void
    removeAttachment: (id: string) => void
    setIsCreate: (show: boolean) => void
}

export const useCreateBoardModal = create<CreateBoardModalState>((set) => ({
    showCreateBoardModal: false,
    setShowCreateBoardModal: () => set((state) => ({ ...state, showCreateBoardModal: !state.showCreateBoardModal })),
}))

export const useBoardsStores = create<BoardsState>((set) => ({
    boards: [],
    addBoard: (newBoard: { id: string; name: string }) =>
        set((state) => ({ ...state, boards: [...state.boards, { ...newBoard, tasks: [], taskStatus: [], users: [], usersRole: [] }] })),
    setBoards: (boards: Board[]) => set((state) => ({ ...state, boards: [...boards] })),
}))

export const useDashboardStore = create<DashboardState>((set) => ({
    board: { id: '', name: '', taskStatus: [], tasks: [], users: [], usersRole: [] },
    setDashboard: (board: Board) => set((state) => ({ ...state, board: board })),
    addTask: (task: Task) => set((state) => ({ ...state, board: { ...state.board, tasks: [...state.board.tasks, task] } })),
    setTasks: (tasks: Task[]) => set((state) => ({ ...state, board: { ...state.board, tasks: [...tasks] } })),
    replaceTask: (taskToReplace: Task) =>
        set((state) => ({
            ...state,
            board: {
                ...state.board,
                tasks: state.board.tasks.map((task) => {
                    if (task.id === taskToReplace.id) {
                        return { ...taskToReplace }
                    }
                    return task
                }),
            },
        })),
}))

export const useTaskFormModal = create<CreateTaskModalState>((set) => ({
    showTaskFormModal: false,
    setShowTaskFormModal: (show) => set((state) => ({ ...state, showTaskFormModal: show })),
}))

export const useTaskFormData = create<TaskFormDataState>((set) => ({
    isCreate: true,
    task: { id: '', title: '', taskStatus: { id: '', status: '' }, description: '', user: { id: '', name: '' }, boardId: '', attachments: [] },
    setTask: (task) => set((state) => ({ ...state, task: task })),
    resetTask: () =>
        set((state) => ({
            ...state,
            task: { id: '', title: '', taskStatus: { id: '', status: '' }, description: '', user: { id: '', name: '' }, boardId: '', attachments: [] },
        })),
    removeAttachment: (id) =>
        set((state) => ({
            ...state,
            task: { ...state.task, attachments: (state.task.attachments as Attachment[]).filter((att) => att.id !== id) },
        })),
    setIsCreate: (show) => set((state) => ({ ...state, isCreate: show })),
}))

export const useViewTaskModal = create<ViewTaskModalState>((set) => ({
    showViewTaskModal: false,
    setShowViewTaskModal: (show: boolean) => set((state) => ({ ...state, showViewTaskModal: show })),
}))

export const useGetOneTaskStore = create<{ taskId: string; boardId: string; setStore: (taskId: string, boardId: string) => void }>((set) => ({
    taskId: '',
    boardId: '',
    setStore: (taskId, boardId) => set((state) => ({ ...state, taskId, boardId })),
}))
