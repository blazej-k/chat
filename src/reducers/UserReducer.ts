import {SIGNUP} from '../actions/UserActions'
const initState: UserReducer = {
    user: {} as User,
    loading: false,
    error: '',
}

export const UserReducer = (state = initState, action: UserActionType) => {
    switch(action.type){
        case SIGNUP:
            const {login, sex, groups, conversations, waitingFriends, friends} = action.payload
            return state = {...state, user: {login, sex, groups, conversations, waitingFriends, friends}}
        default: 
            return state
    }
}