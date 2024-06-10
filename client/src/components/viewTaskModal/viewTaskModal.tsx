import React, { useEffect, useState } from 'react'
import { Attachment, useGetOneTaskStore, useTaskFormData, useTaskFormModal, useViewTaskModal } from '../../store/boardStore'
import './style.css'
import download from '../../assets/downloadIcon.svg'
import { Task, useGetOne } from '../../api/apiRequestHooks'

export const ViewTaskModal = () => {
    const { setShowViewTaskModal } = useViewTaskModal()
    const { setShowTaskFormModal } = useTaskFormModal()
    const { setTask, setIsCreate } = useTaskFormData()
    const { taskId, boardId } = useGetOneTaskStore()
    const [taskDataView, setTaskDataView] = useState({
        title: '',
        id: '',
        description: '',
        attachments: [{ id: '', attachmentUrl: '' }],
        taskStatus: { id: '', status: '' },
    } as Task)
    const { isSuccess, error, data, mutate } = useGetOne()

    useEffect(() => {
        if (isSuccess) {
            console.log(data!.data)
            setTaskDataView({ ...data!.data, attachments: data!.data.attachments! as Attachment[] })
            return
        }
        if (error) {
            console.log(error)
            return
        }
        mutate({ taskId, boardId })
    }, [isSuccess, error])

    function handleEdit() {
        setTask({ ...taskDataView, boardId })
        setIsCreate(false)
        setShowViewTaskModal(false)
        setShowTaskFormModal(true)
    }
    return (
        <div className="view-task-modal-container">
            <div className="view-task-modal-section">
                <header className="view-task-modal-header">
                    <h1>{taskDataView.title}</h1>
                    <span className="status-tag">{taskDataView.taskStatus.status}</span>
                </header>
                <sub></sub>
                <textarea readOnly rows={20} cols={50} value={taskDataView.description} name="description-area" id="description-area"></textarea>
                <label>
                    Attachment
                    <div className="attachments-section">
                        {(taskDataView.attachments as Attachment[]).map((attachment) => (
                            <a key={attachment.id} className="attachment-download" href={attachment.attachmentUrl}>
                                <img className="attachment-icon" src={download} alt="download" />
                            </a>
                        ))}
                    </div>
                </label>
                <button onClick={handleEdit}>Edit</button>
                <button onClick={() => setShowViewTaskModal(false)}>Cancel</button>
            </div>
        </div>
    )
}
