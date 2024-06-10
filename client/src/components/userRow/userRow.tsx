import './style.css'
import React, { useEffect } from 'react'
import trashIcon from '../../assets/trashIcon.svg'
import { useAddUser, useRemoveUser } from '../../api/apiRequestHooks'
import { useUsersBackOffice } from '../../store/boardStore'

export function UserRow({ id, name, boardId }: { id: string; name: string; boardId: string }) {
    const { isSuccess, error, mutate } = useRemoveUser()
    const { removeUser } = useUsersBackOffice()

    useEffect(() => {
        if (isSuccess) {
            return
        }
        if (error) {
            console.log(error)
        }
    }, [isSuccess, error])

    async function handleRemove() {
        removeUser
        mutate({ userId: id, boardId })
    }

    return (
        <div className="user-row" key={id}>
            <span>{name}</span>
            <button onClick={handleRemove}>
                <img className="remove-user-icon" src={trashIcon} alt="" />
            </button>
        </div>
    )
}
