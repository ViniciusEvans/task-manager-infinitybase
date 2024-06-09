import React, { useEffect } from 'react'
import { useDashboardStore } from '../../store/boardStore'
import { useFindTask } from '../../api/apiRequestHooks'

export const SearchInput = () => {
    const { board, setTasks } = useDashboardStore()
    const { mutate, isSuccess, data } = useFindTask()

    useEffect(() => {
        if (isSuccess) {
            setTasks(data!.data)
        }
    }, [isSuccess])

    async function handleSearch(valueInput: string, keyPressed: string) {
        if (keyPressed !== 'Enter') return

        mutate({ query: valueInput, boardId: board.id })
    }

    return (
        <div className="input-container">
            <input type="text" onKeyDown={(e) => handleSearch(e.currentTarget.value, e.key)} />
        </div>
    )
}
