import { useTaskFormModal, useDashboardStore, useTaskFormData } from '../../store/boardStore'
import { Task } from '../task/task'
import React from 'react'
import './style.css'

export const TaskBoard = ({ id, name }: { id: string; name: string }) => {
    const { board } = useDashboardStore()
    const { setShowTaskFormModal } = useTaskFormModal()
    const { setIsCreate } = useTaskFormData()
    const tasks = board.tasks.filter((task) => task.taskStatus.id === id)

    function handleClick() {
        setIsCreate(true)
        setShowTaskFormModal(true)
    }

    return (
        <div className="task-board">
            <h3>{name}</h3>
            <button className="add-task-button" onClick={() => handleClick()}>
                +
            </button>

            {tasks && tasks.map((task) => <Task boardId={board.id} key={task.id} id={task.id} title={task.title} ownerName={task.user.name} />)}
        </div>
    )
}
