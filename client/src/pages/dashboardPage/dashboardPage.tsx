import './style.css'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetBoard } from '../../api/apiRequestHooks'
import React, { useEffect } from 'react'
import { useTaskFormModal, useDashboardStore, useViewTaskModal, EUserPermissionLevel } from '../../store/boardStore'
import engine from '../../assets/definicoes.svg'
import { TaskBoard } from '../../components/taskBoard/taskBoard'
import { SearchInput } from '../../components/searchInput/searchInput'
import { ViewTaskModal } from '../../components/viewTaskModal/viewTaskModal'
import { TaskFormModal } from '../../components/taskFormModal/TaskFormModal'

export const DashboardPage = () => {
    const { mutate, isSuccess, data, error } = useGetBoard()
    const { board, setDashboard } = useDashboardStore()
    const { id } = useParams()
    const { showTaskFormModal } = useTaskFormModal()
    const { showViewTaskModal } = useViewTaskModal()
    const navigate = useNavigate()

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

    function isAdmin() {
        return board.usersRole[0]?.userPermissionLevel === EUserPermissionLevel.ADMIN
    }

    return (
        <div className="dashboard-container">
            <section className="tasks-section">
                <header className="section-header">
                    <h3>{board.name}</h3>

                    {isAdmin() && (
                        <button onClick={() => navigate(`/back-office/board/${board.id}`)} className="engine-button">
                            <img id="engine-img" src={engine} alt="configurações do board" />
                        </button>
                    )}
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
            {showTaskFormModal && <TaskFormModal />}
            {showViewTaskModal && <ViewTaskModal />}
        </div>
    )
}
