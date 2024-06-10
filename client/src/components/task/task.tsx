import React from 'react'
import './style.css'
import { useGetOneTaskStore, useViewTaskModal } from '../../store/boardStore'

export const Task = ({ id, title, ownerName, boardId }: { id: string; title: string; ownerName: string; boardId: string }) => {
    const { setShowViewTaskModal } = useViewTaskModal()
    const { setStore } = useGetOneTaskStore()

    function handleClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) {
        setStore(event.currentTarget.attributes.getNamedItem('id')!.value, boardId)
        setShowViewTaskModal(true)
    }

    return (
        <>
            <button id={id} className="task" onClick={(e) => handleClick(e)}>
                <h3>{title}</h3>
                <span>{ownerName}</span>
            </button>
        </>
    )
}
