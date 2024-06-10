import React, { FormEvent, MouseEventHandler, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './style.css'
import { TaskStatusRow } from '../../components/taskStatusRow/taskStatusRow'
import { UserRow } from '../../components/userRow/userRow'
import { EUserPermissionLevel, useUsersBackOffice } from '../../store/boardStore'
import { useAddUser, useGetTaskStatus, useGetUsers } from '../../api/apiRequestHooks'

export function BoardBackOfficePage() {
    const { users, setUsers, addUSer } = useUsersBackOffice()
    const [taskStatus, setTaskStatus] = useState([{ id: '', status: '' }])
    const { id } = useParams()
    const { getTaskStatusData, getTaskStatusIsSuccess, getTaskStatusError } = useGetTaskStatus(id!)
    const { getUsersData, getUsersIsSuccess, getUsersError, mutate: mutateUser } = useGetUsers()
    const [addInput, setAddInput] = useState('')
    const { mutate: mutateAddUser, isSuccess: addUserIsSucces, error: addUserError, data: addUserData } = useAddUser()

    useEffect(() => {
        if (getTaskStatusIsSuccess) {
            setTaskStatus(getTaskStatusData!.data)
        }
        if (getTaskStatusError) {
            console.log(getTaskStatusError)
        }
    }, [getTaskStatusIsSuccess, getTaskStatusError])

    useEffect(() => {
        if (getUsersIsSuccess) {
            setUsers(getUsersData!.data)
            return
        }

        if (getUsersError) {
            console.log(getUsersError)
            return
        }

        mutateUser(id!)
    }, [getUsersIsSuccess, getUsersError])

    useEffect(() => {
        if (addUserIsSucces) {
            addUSer(addUserData!.data)
            return
        }

        if (addUserError) {
            console.log(addUserError)
            return
        }

        mutateUser(id!)
    }, [addUserIsSucces, addUserError])

    function handleSubmit() {
        mutateAddUser({ userToAddEmail: addInput, boardId: id!, permissionLevel: EUserPermissionLevel.USER })
    }

    return (
        <div className="board-backoffice-container">
            <h1>Settings </h1>
            <div className="board-backoffice-users-section">
                <h3>Users</h3>
                <div className="search-input-container">
                    <input
                        className="search-users-input"
                        placeholder="email"
                        id="add-user"
                        type="text"
                        value={addInput}
                        onChange={(e) => setAddInput(e.currentTarget.value)}
                    />
                    <button className="submit-search-users-button" onClick={handleSubmit}>
                        +
                    </button>
                </div>
                <div className="users-container">
                    {users.map((user) => (
                        <UserRow key={user.id} id={user.id} name={user.name} boardId={id!} />
                    ))}
                </div>
            </div>

            <div className="task-status-container">
                <p>Task status</p>
                {taskStatus.map((status) => (
                    <TaskStatusRow key={status.id} boardId={id!} id={status.id} status={status.status} />
                ))}
            </div>
        </div>
    )
}
