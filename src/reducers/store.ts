import { combineReducers, createStore } from 'redux'
import { UserReducer } from './UserReducer'

const rootReducer = combineReducers({
    userReducer: UserReducer
})

export const store = createStore(rootReducer) 