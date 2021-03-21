import { SIGNUP, SIGNIN, ERRORMESSAGE, JOINTOGROUP, CONFIRMFRIEND, CONFIRMGROUP } from '../actions/UserActions'
const initState: UserReducer = {
    user: {} as User,
    loading: false,
    error: '',
}

export const UserReducer = (state = initState, action: UserActionType) => {
    switch (action.type) {
        case SIGNIN:
        case SIGNUP:
            const { login, sex, conversations, waitingFriends, waitingGroups, friends, groups } = action.payload
            return state = { ...state, user: { login, sex, conversations, waitingFriends, waitingGroups, friends, groups } }
        case JOINTOGROUP:
            const { user } = state
            user.groups.push(action.payload)
            return state = { loading: false, error: '', user: { ...user, groups: user.groups } }
        case CONFIRMFRIEND:
            return state = {loading: false, error: '', user: {...user, friends: [...state.user.friends, action.payload as Friend]}}
        case CONFIRMGROUP:
            user.groups.push(action.payload as Group) 
            return state = {loading: false, error: '', user: {...user, groups: user.groups}}
        case ERRORMESSAGE:
            return state = { ...state, user: {} as User, error: action.payload }
        default:
            return state
    }
}