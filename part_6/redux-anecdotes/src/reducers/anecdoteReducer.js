import { createSlice } from '@reduxjs/toolkit'
import anecdotesService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    vote(state, action) {
      const id = action.payload.id
      const anecdoteToVote = state.find(anecdote => anecdote.id === id)
      const updatedAnecdote = {...anecdoteToVote, votes: anecdoteToVote.votes + 1}
      return state.map(anecdote => anecdote.id !== id ? anecdote : updatedAnecdote)
    },
    create(state, action) {
      const newAnecdote = asObject(action.payload.content)
      return [...state, newAnecdote]
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})


export const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    textFilter(state, action) {
      return action.payload.text
    }
  }
})

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
    clearNotification(state) {
      return ''; // Action to clear notification
    }
  }
});

export const incrementVote = anecdoteSlice.actions.vote
export const createAnecdote = anecdoteSlice.actions.create
export const setAnecdotes = anecdoteSlice.actions.setAnecdotes
export const anecdoteReducer = anecdoteSlice.reducer

export const filterText = filterSlice.actions.textFilter
export const filterReducer = filterSlice.reducer

export const setNotification = notificationSlice.actions.setNotification
export const clearNotification = notificationSlice.actions.clearNotification
export const notificationReducer = notificationSlice.reducer

export const initialAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const newAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdotesService.create(content)
    dispatch(createAnecdote(newAnecdote))
  }
}

export const voteAnecdote = (id) => {
  return async (dispatch) => {
    const anecdoteToVote = await anecdotesService.vote(id)
    dispatch(incrementVote(anecdoteToVote))
  }
}

export const setNotificationWithTimeout = (notification, duration) => {
  return async (dispatch) => {
    dispatch(setNotification(notification))
    setTimeout(() => {
      dispatch(clearNotification())
    }, duration * 1000)
  }
}