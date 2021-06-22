import { combineReducers, createStore } from "redux"
import { UserReducer } from "../reducers/UserReducer"

const exampleUser: User = {
    login: 'user',
    sex: 'female',
    friends: [],
    groups: [],
    waitingFriends: [],
    waitingGroups: [],
    conversations: []
}

const rootReducer = combineReducers({
    userReducer: UserReducer,
})
const getStore = (user: User = exampleUser) => {
    const store = createStore(rootReducer, { userReducer: { user, loading: false, error: '' } })
    return store
}
export { getStore, exampleUser }