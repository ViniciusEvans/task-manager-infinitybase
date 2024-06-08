import React, { FormEvent, useEffect, useState } from 'react'
import './style.css'
import { useCreateTaskModal, useDashboardStore, useTaskFormData } from '../../store/boardStore'
import { useCreateTask } from '../../api/apiRequestHooks'
import { file2Buffer } from '../../resources/fileToBuffer'
import { Buffer } from 'buffer'
import { getFileExtension } from '../../resources/getFileExtension'

export const CreateTaskModal = () => {
    const { setShowCreateTaskModal } = useCreateTaskModal()
    const { board, addTask } = useDashboardStore()
    const { mutate, isSuccess, error, data } = useCreateTask()
    const { setTask, task, resetTask } = useTaskFormData()
    const [errorMessage, setErrorMessage] = useState('')
    const [files, setFiles] = useState([] as File[])

    async function handleSubmit(e: FormEvent) {
        e.preventDefault()

        const attachments: { fileExt: string; fileBuffer: Buffer }[] = []
        for (const file of files) {
            const fileArrayBuffer: ArrayBuffer = (await file2Buffer(file)) as ArrayBuffer
            attachments.push({ fileExt: getFileExtension(file), fileBuffer: Buffer.from(fileArrayBuffer) })
        }

        setTask({ ...task, boardId: board.id })
        mutate({ ...task, attachments: attachments, boardId: board.id })
    }

    useEffect(() => {
        if (error && (error as any).response.status.toString().includes(40)) {
            setErrorMessage((error as any).response.data.errorMessage)
            return
        }
        if (isSuccess) {
            setErrorMessage('')
            setShowCreateTaskModal()
            resetTask()
            addTask(data!.data)
        }
    }, [error, isSuccess])

    function handleFiles(event: HTMLInputElement) {
        if (!event.files) {
            return
        }

        const fileArr: File[] = []
        for (let i = 0; i < event.files.length; i++) {
            fileArr.push(event.files[i])
        }
        setFiles(fileArr)
    }

    return (
        <div className="task-modal-container">
            <div className="task-modal-section">
                <h1>Create Task</h1>
                <form className="task-modal-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="title"
                        id="title"
                        className="task-input"
                        onChange={(e) => setTask({ ...task, title: e.currentTarget.value })}
                    />

                    <label htmlFor="users" className="task-user-select-label task-select-label">
                        User
                        <select
                            className="task-selector"
                            name="users"
                            id="users"
                            onChange={(e) => setTask({ ...task, user: { ...task.user, id: e.currentTarget.value } })}
                            value={task.user.id}
                            defaultValue=""
                        >
                            <option value="">Select user</option>
                            {board.usersRole.map((userRole) => (
                                <option key={userRole.user.id} value={userRole.user.id}>
                                    {userRole.user.name}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label htmlFor="status" className="task-status-select-label task-select-label">
                        Status
                        <select
                            className="task-selector"
                            name="status"
                            id="status"
                            onChange={(e) => setTask({ ...task, taskStatus: { ...task.taskStatus, id: e.target.value } })}
                            value={task.taskStatus.id}
                            defaultValue=""
                        >
                            <option value="">Select status</option>

                            {board.taskStatus.map((taskStatus) => (
                                <option key={taskStatus.id} value={taskStatus.id}>
                                    {taskStatus.status}
                                </option>
                            ))}
                        </select>
                    </label>

                    <textarea className="task-textarea" value={task.description} onChange={(e) => setTask({ ...task, description: e.currentTarget.value })} />

                    <input type="file" className="input-file" name="attachments" multiple onChange={(e) => handleFiles(e.target)} />

                    <button type="submit" className="create-task-button task-button">
                        Create
                    </button>
                    <button type="button" className="cancel-task-button task-button" onClick={setShowCreateTaskModal}>
                        Cancel
                    </button>
                    <span id="error-message">{errorMessage}</span>
                </form>
            </div>
        </div>
    )
}
