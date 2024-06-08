import React, { useEffect, useState } from 'react'
import './style.css'
import { useNavigate } from 'react-router-dom'
import { useSignup } from '../../api/apiRequestHooks'

const SignupPage = () => {
    const [errorMessage, setErrorMessage] = useState('')
    const [formParams, setFormParams] = useState({ email: '', password: '', name: '' })

    const navigate = useNavigate()

    const { mutate, error, isSuccess } = useSignup()

    async function submitForm(event: React.FormEvent) {
        event.preventDefault()

        mutate({ ...formParams })

        setFormParams({ email: '', name: '', password: '' })
    }

    useEffect(() => {
        if (isSuccess) {
            navigate('/login')
        }
        if (error && (error as any).response.status.toString().includes(40)) {
            setErrorMessage((error as any).response.data.errorMessage)
        }
    }, [isSuccess, error])

    return (
        <div className="signup-container">
            <header>
                <h1>Create account</h1>
            </header>
            <form onSubmit={submitForm}>
                <input
                    placeholder="name"
                    id="name-input"
                    type="text"
                    value={formParams.name}
                    onChange={(e) => setFormParams({ ...formParams, name: e.currentTarget.value })}
                />
                <input
                    placeholder="email"
                    id="email-input"
                    type="email"
                    value={formParams.email}
                    onChange={(e) => setFormParams({ ...formParams, email: e.currentTarget.value })}
                />
                <input
                    placeholder="password"
                    id="password-input"
                    type="password"
                    value={formParams.password}
                    onChange={(e) => setFormParams({ ...formParams, password: e.currentTarget.value })}
                />
                <button type="submit">Create account</button>

                <span id="error-message">{errorMessage}</span>
            </form>
        </div>
    )
}

export default SignupPage
