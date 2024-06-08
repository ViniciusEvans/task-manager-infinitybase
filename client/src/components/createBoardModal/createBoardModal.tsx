import { FormEvent, useEffect, useState } from 'react'
import { useCreateBoard } from '../../api/apiRequestHooks'
import { useBoardsStores, useCreateBoardModal } from '../../store/boardStore'
import React from 'react'
import './style.css'

export const CreateBoardModal = () => {
    const [name, setName] = useState('')
    const { mutate, isSuccess, data } = useCreateBoard()
    const { setShowCreateBoardModal } = useCreateBoardModal()
    const addBoard = useBoardsStores((state) => state.addBoard)

    function submitForm(event: FormEvent) {
        event.preventDefault()
        if (!name) {
            return
        }
        mutate(name)
    }

    useEffect(() => {
        if (isSuccess) {
            setShowCreateBoardModal()
            addBoard(data!.data)
        }
    }, [isSuccess])

    return (
        <div className="modal-container">
            <section className="create-modal-section">
                <form onSubmit={submitForm}>
                    <input placeholder="name" id="name-input" type="text" value={name} onChange={(e) => setName(e.currentTarget.value)} />

                    <button id="create-button" type="submit">
                        Create
                    </button>
                </form>
                <button id="close-button" type="button" onClick={setShowCreateBoardModal}>
                    x
                </button>
            </section>
        </div>
    )
}
