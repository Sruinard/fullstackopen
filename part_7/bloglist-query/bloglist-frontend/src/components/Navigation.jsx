import { useUser } from '../hooks/user'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
const Navigation = () => {
    const { user, logout } = useUser()
    const navigate = useNavigate()

    useEffect(() => {
        if (!user) {
            navigate('/')
        }
    }, [user, navigate])

    const handleLogout = () => {
        logout()
        navigate('/')
    }

    if (!user) {
        return null
    }
    return (
        // create a navigation bar with the following links:
        // Home, Users, Blogs
        // and a logout button
        <div style={{
            backgroundColor: '#f0f0f0',
            padding: '1rem',
            display: 'flex',
            gap: '1rem',
            alignItems: 'center'
        }}>
            <Link to="/">Home</Link>
            <Link to="/users">Users</Link>
            <Link to="/blogs">Blogs</Link>
            {user && <button onClick={handleLogout}>logout</button>}
        </div>
    )
}

export default Navigation