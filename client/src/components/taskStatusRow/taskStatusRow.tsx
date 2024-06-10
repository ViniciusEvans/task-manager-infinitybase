import React, { useState } from 'react'
import './style.css'
import CheckIcon from '../../assets/checkIcon.svg'
import { useEditStatus } from '../../api/apiRequestHooks'

export function TaskStatusRow({ id, status, boardId }: { id: string; status: string; boardId: string }) {
    const { mutate } = useEditStatus()
    const [input, setInput] = useState(status)

    async function handleSubmit() {
        mutate({ boardId, statusId: id, status: input })
    }
    return (
        <div className="task-status-row" key={id}>
            <label className="task-status-label" htmlFor={`status-input-${id}`}>
                {status}
                <div>
                    <input
                        className="task-status-input"
                        id={`status-input-${id}`}
                        onChange={(e) => setInput(e.currentTarget.value)}
                        value={input}
                        type="text"
                    />
                    <button onClick={handleSubmit}>
                        <img className="submit-status-icon" src={CheckIcon} />
                    </button>
                </div>
            </label>
        </div>
    )
}
