import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// Create async thunk for login
export const loginUser = createAsyncThunk(
    'auth/login',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                body: JSON.stringify(credentials)
            })
            const data = await response.json()
            
            if (!response.ok) {
                return rejectWithValue(data.error)
            }
            
            return data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        isAuthenticated: false,
        error: null,
        loading: false
    },
    reducers: {
        logout: (state) => {
            state.user = null
            state.isAuthenticated = false
            state.error = null
        },
        clearError: (state) => {
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload
                state.isAuthenticated = true
                state.error = null
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
                state.isAuthenticated = false
                state.user = null
            })
    }
})

// Export actions
export const { logout, clearError } = authSlice.actions

// Export selectors
export const selectAuth = (state) => state.auth

// Export reducer
export default authSlice.reducer 