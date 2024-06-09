import './style.css'
import { useParams } from 'react-router-dom'
import { useGetBoard } from '../../api/apiRequestHooks'
import React, { useEffect } from 'react'
import { useCreateTaskModal, useDashboardStore, useViewTaskModal } from '../../store/boardStore'
import engine from '../../assets/definicoes.svg'
import { TaskBoard } from '../../components/taskBoard/taskBoard'
import { SearchInput } from '../../components/searchInput/searchInput'
import { CreateTaskModal } from '../../components/createTaskModal/createTaskModal'
import { ViewTaskModal } from '../../components/viewTaskModal/viewTaskModal'

export const DashboardPage = () => {
    const { mutate, isSuccess, data, error } = useGetBoard()
    const { board, setDashboard } = useDashboardStore()
    const { id } = useParams()
    const { showCreateTaskModal } = useCreateTaskModal()
    const { showViewTaskModal } = useViewTaskModal()

    useEffect(() => {
        if (isSuccess) {
            setDashboard(data!.data)
            return
        }
        if (error) {
            return
        }
        mutate(id!)
    }, [isSuccess, error])

    return (
        <div className="dashboard-container">
            <section className="tasks-section">
                <header className="section-header">
                    <h3>{board.name}</h3>
                    <button className="engine-button">
                        <img id="engine-img" src={engine} alt="configurações do board" />
                    </button>
                </header>
                <nav>
                    <SearchInput />
                </nav>
                <div className="task-board-container">
                    {board.taskStatus.map((taskStatus) => (
                        <TaskBoard key={taskStatus.id} id={taskStatus.id} name={taskStatus.status} />
                    ))}
                </div>
            </section>
            {showCreateTaskModal && <CreateTaskModal />}
            {showViewTaskModal && <ViewTaskModal />}
        </div>
    )
}
