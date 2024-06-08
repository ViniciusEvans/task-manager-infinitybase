import React from 'react'
import './style.css'

export const Task = ({ id, title, ownerName }: { id: string; title: string; ownerName: string }) => {
    return (
        <button className="task">
            <h3 id="title">{title}</h3>
            <span>{ownerName}</span>
        </button>
    )
}
