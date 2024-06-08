import { useCreateTaskModal, useDashboardStore } from '../../store/boardStore'
import { Task } from '../task/task'
import React from 'react'
import './style.css'

export const TaskBoard = ({ id, name }: { id: string; name: string }) => {
    const { board } = useDashboardStore()
    const { setShowCreateTaskModal } = useCreateTaskModal()

    const tasks = board.tasks.filter((task) => task.taskStatus.id === id)

    return (
        <div className="task-board">
            <h3>{name}</h3>
            <button className="add-task-button" onClick={setShowCreateTaskModal}>+</button>

            {tasks && tasks.map((task) => <Task key={task.id} id={task.id} title={task.title} ownerName={task.user.name} />)}
        </div>
    )
}
