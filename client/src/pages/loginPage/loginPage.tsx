import React, { useEffect, useState } from 'react'
import './style.css'
import { useNavigate } from 'react-router-dom'
import { useLogin } from '../../api/apiRequestHooks'

const LoginPage = () => {
    const [errorMessage, setErrorMessage] = useState('')
    const [formParams, setFormParams] = useState({ email: '', password: '' })
    const { mutate, error, isSuccess, data } = useLogin()
    const navigate = useNavigate()

    async function submitForm(event: React.FormEvent) {
        event.preventDefault()

        mutate({ ...formParams })

        setFormParams({ email: '', password: '' })
    }

    useEffect(() => {
        if (isSuccess) {
            localStorage.setItem('refreshToken', data!.data.refreshToken)
            localStorage.setItem('accessToken', data!.data.accessToken)

            navigate('/boards')
        }
        if (error && (error as any).response.status.toString().includes(40)) {
            setErrorMessage((error as any).response.data.errorMessage)
        }
    }, [isSuccess, error])

    return (
        <div className="login-container">
            <header>
                <h1>Login</h1>
            </header>
            <form onSubmit={submitForm}>
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
                <button id="login-button" type="submit">
                    Login
                </button>
                <button id="redirect-signup-button" type="button" onClick={() => navigate('/signup')}>
                    Create Account
                </button>

                <span id="error-message">{errorMessage}</span>
            </form>
        </div>
    )
}

export default LoginPage
