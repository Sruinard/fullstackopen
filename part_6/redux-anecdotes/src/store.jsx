import { configureStore } from '@reduxjs/toolkit'
import { anecdoteReducer, filterReducer, notificationReducer } from './reducers/anecdoteReducer'

const store = configureStore({
    reducer: {
        anecdotes: anecdoteReducer,
        filter: filterReducer,
        notification: notificationReducer
    }
})

export default store