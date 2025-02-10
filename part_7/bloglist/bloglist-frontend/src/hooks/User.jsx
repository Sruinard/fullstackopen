import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setUser } from "../features/users/UserSlice"
import loginService from "../services/login"
import blogService from "../services/blogs"

const useUser = () => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)



    const login = async (username, password) => {
        console.log("logging in with:", username, password);
        const user = await loginService.login({ username, password })
        const logged_user = {
            id: user.id,
            name: user.name,
            username: user.username,
            token: user.token,
            exists: true
        }
        console.log("logged_user:", logged_user);
        dispatch(setUser(logged_user))
        window.localStorage.setItem("loggedBlogappUser", JSON.stringify(logged_user))
        return user
    }

    const logout = () => {
        const logged_user = {
            id: null,
            name: null,
            username: null,
            token: null,
            exists: false
        }
        dispatch(setUser(logged_user))
        window.localStorage.removeItem("loggedBlogappUser")
    }

    useEffect(() => {
        const loggedUser = window.localStorage.getItem("loggedBlogappUser")
        console.log("loggedUser:", loggedUser);
        if (loggedUser) {
            const user = JSON.parse(loggedUser)
            console.log("user from parsed localStorage:", user);
            const loaded_user = {
                id: user.id,
                name: user.name,
                username: user.username,
                token: user.token,
                exists: true
            }
            dispatch(setUser(loaded_user))
            blogService.setToken(user.token)
        }
    }, [dispatch])

    return {
        user,
        login,
        logout
    }
}

export default useUser
