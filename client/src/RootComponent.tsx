import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, useNavigate, Navigate } from 'react-router-dom'
import NotFoundPage from './pages/NotFoundPage'
import { ROUTES } from './resources/routes-constants'
import SignupPage from './pages/signupPage/signupPage'
import { QueryClient, QueryClientProvider } from 'react-query'
import LoginPage from './pages/loginPage/loginPage'
import BoardsPage from './pages/boardsPage/boardsPage'
import { useRefreshToken } from './api/apiRequestHooks'
import { DashboardPage } from './pages/dashboardPage/dashboardPage'

const queryClient = new QueryClient()

const ProtectedRoute = ({ children }: any) => {
    const token = localStorage.getItem('refreshToken')
    const { mutate, isSuccess, error, data } = useRefreshToken()
    const navigate = useNavigate()

    if (!token) {
        return <Navigate to="/login" />
    }

    useEffect(() => {
        mutate()
    }, [])
    useEffect(() => {
        if (isSuccess) {
            localStorage.setItem('refreshToken', data!.data.refreshToken)
            localStorage.setItem('accessToken', data!.data.accessToken)
        }

        if (error) {
            navigate('login')
        }
    }, [isSuccess])

    return children
}

const RootComponent: React.FC = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <Routes>
                    <Route path="*" element={<NotFoundPage />} />
                    <Route path="/" element={<Navigate to="boards" />} />
                    <Route path={ROUTES.SIGNUPPAGE_ROUTE} element={<SignupPage />} />
                    <Route path={ROUTES.LOGINPAGE_ROUTE} element={<LoginPage />} />
                    <Route
                        path="/boards"
                        element={
                            <ProtectedRoute>
                                <BoardsPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/board/:id"
                        element={
                            <ProtectedRoute>
                                <DashboardPage />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </Router>
        </QueryClientProvider>
    )
}

export default RootComponent
