import { combineReducers, createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { UserReducer } from './UserReducer'

const rootReducer = combineReducers({
    userReducer: UserReducer
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk))) 