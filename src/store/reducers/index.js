import { combineReducers } from '@reduxjs/toolkit'
import userReducer from './userReducer'
import authReducer from './authReducer'
import cartReducer from './cartReducer'

const rootReducer = combineReducers({
    user: userReducer,
    auth: authReducer,
    cart: cartReducer,
})

export default rootReducer 