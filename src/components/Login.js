import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, selectAuth } from '../store/slices/authSlice'

const Login = () => {
    const dispatch = useDispatch()
    const { error, loading } = useSelector(selectAuth)
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        dispatch(loginUser(credentials))
    }

    return (
        <form onSubmit={handleSubmit}>
            {error && <div className="error">{error}</div>}
            <input
                type="email"
                placeholder="Email"
                value={credentials.email}
                onChange={(e) => setCredentials({
                    ...credentials,
                    email: e.target.value
                })}
            />
            <input
                type="password"
                placeholder="Password"
                value={credentials.password}
                onChange={(e) => setCredentials({
                    ...credentials,
                    password: e.target.value
                })}
            />
            <button type="submit" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
            </button>
        </form>
    )
}

export default Login 