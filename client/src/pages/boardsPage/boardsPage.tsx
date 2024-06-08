import React, { useEffect } from 'react'
import './style.css'
import { useGetAllBoards } from '../../api/apiRequestHooks'
import { useNavigate } from 'react-router-dom'
import { useBoardsStores, useCreateBoardModal } from '../../store/boardStore'
import { CreateBoardModal } from '../../components/createBoardModal/createBoardModal'

const BoardsPage = () => {
    const { boards, setBoards } = useBoardsStores()
    const { error, isSuccess, data } = useGetAllBoards()
    const { showCreateBoardModal, setShowCreateBoardModal } = useCreateBoardModal()
    const navigate = useNavigate()

    useEffect(() => {
        if (isSuccess) {
            setBoards(data!.data)
        }
    }, [isSuccess, error])

    return (
        <div className="boards-container">
            <header></header>
            <section className="main-section">
                <h3 className="title">Boards</h3>
                <section className="create-new-board-section">
                    <button className="create-new-board-button" onClick={() => setShowCreateBoardModal()}>
                        +
                    </button>
                </section>

                <section className="boards-section">
                    {boards.map((board) => (
                        <button key={board.id} id={board.id} className="board" onClick={() => navigate(`/board/${board.id}`)}>
                            {board.name}
                        </button>
                    ))}
                </section>
            </section>

            {showCreateBoardModal && <CreateBoardModal />}
        </div>
    )
}

export default BoardsPage
