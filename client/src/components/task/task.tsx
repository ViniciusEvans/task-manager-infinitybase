import React from 'react'
import './style.css'
import { useGetOneTaskStore, useViewTaskModal } from '../../store/boardStore'

export const Task = ({ id, title, ownerName, boardId }: { id: string; title: string; ownerName: string; boardId: string }) => {
    const { setShowViewTaskModal } = useViewTaskModal()
    const { setStore } = useGetOneTaskStore()

    function handleClick() {
        setStore(id, boardId)
        setShowViewTaskModal()
    }

    return (
        <>
            <button className="task" onClick={handleClick}>
                <h3 id={id}>{title}</h3>
                <span>{ownerName}</span>
            </button>
        </>
    )
}
