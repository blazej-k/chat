import { combineReducers, createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { CommunityReducer } from './CommReducer'
import { UserReducer } from './UserReducer'

const rootReducer = combineReducers({
    userReducer: UserReducer,
    commReducer: CommunityReducer
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk))) 