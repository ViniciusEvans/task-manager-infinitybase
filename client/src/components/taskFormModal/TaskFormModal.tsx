import React, { FormEvent, useEffect, useState } from 'react'
import './style.css'
import { useTaskFormModal, useDashboardStore, useTaskFormData, Attachment } from '../../store/boardStore'
import { useCreateTask, useEditTask } from '../../api/apiRequestHooks'
import { file2Buffer } from '../../resources/fileToBuffer'
import { Buffer } from 'buffer'
import { getFileExtension } from '../../resources/getFileExtension'
import trashIcon from '../../assets/trashIcon.svg'

export const TaskFormModal = () => {
    const { setShowTaskFormModal } = useTaskFormModal()
    const { board, addTask, replaceTask} = useDashboardStore()
    const { mutate: createMutate, isSuccess: createIsSuccess, error: createError, data: createData } = useCreateTask()
    const { mutate: editMutate, isSuccess: editIsSuccess, error: editError, data: editData } = useEditTask()
    const { setTask, task, resetTask, isCreate, removeAttachment } = useTaskFormData()
    const [errorMessage, setErrorMessage] = useState('')
    const [files, setFiles] = useState([] as File[])

    async function handleCreateSubmit(e: FormEvent) {
        e.preventDefault()

        const attachments: { fileExt: string; fileBuffer: Buffer }[] = []

        for (const file of files) {
            const fileArrayBuffer: ArrayBuffer = (await file2Buffer(file)) as ArrayBuffer
            attachments.push({ fileExt: getFileExtension(file), fileBuffer: Buffer.from(fileArrayBuffer) })
        }

        setTask({ ...task, boardId: board.id })

        createMutate({ ...task, attachments: attachments, boardId: board.id })
    }

    async function handleEditSubmit(e: FormEvent) {
        e.preventDefault()

        setTask({ ...task, boardId: board.id })

        editMutate({ ...task, boardId: board.id })
    }

    useEffect(() => {
        if (createError && (createError as any).response.status.toString().includes(40)) {
            setErrorMessage((createError as any).response.data.errorMessage)
            return
        }
        if (createIsSuccess) {
            setErrorMessage('')
            setShowTaskFormModal(false)
            resetTask()
            addTask(createData!.data)
        }
    }, [createError, createIsSuccess])

    useEffect(() => {
        if (editError && (editError as any).response.status.toString().includes(40)) {
            setErrorMessage((editError as any).response.data.errorMessage)
            return
        }
        if (editIsSuccess) {
            setErrorMessage('')
            setShowTaskFormModal(false)
            resetTask()
            replaceTask(editData!.data)
        }
    }, [editError, editIsSuccess])

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

    function handleCancel() {
        resetTask()
        setShowTaskFormModal(false)
    }

    return (
        <div className="task-modal-container">
            <div className="task-modal-section">
                <h1>{isCreate ? 'Create Task' : 'Edit task'}</h1>
                <form className="task-modal-form" onSubmit={isCreate ? handleCreateSubmit : handleEditSubmit}>
                    <input
                        type="text"
                        placeholder="title"
                        id="title"
                        className="task-input"
                        value={task.title}
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

                    <textarea
                        className="task-textarea"
                        value={task.description}
                        onChange={(e) => setTask({ ...task, description: e.currentTarget.value })}
                    />

                    {isCreate ? (
                        <input type="file" className="input-file" name="attachments" multiple onChange={(e) => handleFiles(e.target)} />
                    ) : (
                        (task.attachments as Attachment[]).map((attachment) => (
                            <button
                                key={attachment.id}
                                id={attachment.id}
                                className='delete-attachment-button'
                                onClick={(e) => removeAttachment(e.currentTarget.attributes.getNamedItem('id')!.value)}
                            >
                                <img alt="delete-attachment" className='delete-attachment-icon' src={trashIcon} />
                            </button>
                        ))
                    )}

                    <button type="submit" className="submit-task-button task-button">
                        {isCreate ? 'Create' : 'Edit'}
                    </button>
                    <button type="button" className="cancel-task-button task-button" onClick={handleCancel}>
                        Cancel
                    </button>
                    <span id="error-message">{errorMessage}</span>
                </form>
            </div>
        </div>
    )
}
