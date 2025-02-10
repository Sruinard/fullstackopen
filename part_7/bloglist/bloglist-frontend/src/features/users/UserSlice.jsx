import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    id: null,
    name: null,
    username: null,
    token: null,
    exists: false
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.id = action.payload.id
            state.name = action.payload.name
            state.username = action.payload.username
            state.token = action.payload.token
            state.exists = action.payload.exists
        },
    },
})

export const { setUser } = userSlice.actions
export default userSlice.reducer
