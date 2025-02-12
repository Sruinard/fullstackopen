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
        <nav className="border-b border-gray-200 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center space-x-8">
                        <Link 
                            to="/" 
                            className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
                        >
                            Home
                        </Link>
                        <Link 
                            to="/users" 
                            className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
                        >
                            Users
                        </Link>
                        <Link 
                            to="/blogs" 
                            className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
                        >
                            Blogs
                        </Link>
                    </div>
                    {user && (
                        <button 
                            onClick={handleLogout}
                            className="inline-flex items-center justify-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 transition-colors"
                        >
                            Logout
                        </button>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navigation