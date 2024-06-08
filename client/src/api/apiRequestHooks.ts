import { useMutation, useQuery } from 'react-query'
import { axiosClient } from './axiosClient'

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

type Attachment = {
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

export function useLogin() {
    const { mutate, error, isSuccess, data } = useMutation(async (loginParams: { email: string; password: string }) => {
        return await axiosClient.post<{ accessToken: string; refreshToken: string }>('/auth/login', loginParams)
    })

    return { mutate, error, isSuccess, data }
}

export function useSignup() {
    const { mutate, error, isSuccess } = useMutation(async (signupParams: { email: string; name: string; password: string }) => {
        return await axiosClient.post('/auth/signup', signupParams)
    })

    return { mutate, error, isSuccess }
}

export function useGetAllBoards() {
    const token = localStorage.getItem('accessToken')

    const { error, isSuccess, data } = useQuery({
        queryFn: async () => {
            return await axiosClient.get<Board[]>('/boards', {
                headers: { Authorization: 'Bearer ' + token }
            })
        }
    })

    return { error, isSuccess, data }
}

export function useGetBoard() {
    const token = localStorage.getItem('accessToken')

    const { error, isSuccess, data, mutate } = useMutation(async (id: string) => {
        return await axiosClient.get<Board>('/board/' + id, { headers: { Authorization: 'Bearer ' + token } })
    })

    return { error, isSuccess, data, mutate }
}

export function useCreateBoard() {
    const token = localStorage.getItem('accessToken')

    const { mutate, error, isSuccess, data } = useMutation(async (name: string) => {
        return await axiosClient.post<{ id: string; name: string }>('/board', { name }, { headers: { Authorization: 'Bearer ' + token } })
    })

    return { mutate, error, isSuccess, data }
}

export function useRefreshToken() {
    const token = localStorage.getItem('refreshToken')

    const { mutate, error, isSuccess, data } = useMutation(async () => {
        return await axiosClient.post<{ accessToken: string; refreshToken: string }>('/auth/refresh', { refreshToken: token })
    })

    return { mutate, error, isSuccess, data }
}

export function useCreateTask() {
    const token = localStorage.getItem('refreshToken')
    const { mutate, error, isSuccess, data } = useMutation(async (task: Task & { boardId: string }) => {
        return await axiosClient.post<Task>(
            '/task',
            {
                boardId: task.boardId,
                title: task.title,
                description: task.description,
                statusId: task.taskStatus.id,
                userId: task.user.id,
                attachments: task.attachments
            },
            { headers: { Authorization: 'Bearer ' + token } }
        )
    })

    return { mutate, error, isSuccess, data }
}
