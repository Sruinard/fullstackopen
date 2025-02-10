import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from '../types'

// Action creators
export const loginUser = (credentials) => async (dispatch) => {
    try {
        // Simulate API call
        const response = await fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify(credentials)
        })
        const user = await response.json()

        dispatch({
            type: LOGIN_SUCCESS,
            payload: user
        })
    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.message
        })
    }
}

export const logout = () => ({
    type: LOGOUT
}) 