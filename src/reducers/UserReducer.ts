import {SIGNUP, SIGNIN, ERRORMESSAGE} from '../actions/UserActions'
const initState: UserReducer = {
    user: {} as User,
    loading: false,
    error: '',
}

export const UserReducer = (state = initState, action: UserActionType) => {
    switch(action.type){
        case SIGNIN:
        case SIGNUP:
            const {login, sex, conversations, waitingFriends, waitingGroups} = action.payload
            return state = {...state, user: {login, sex, conversations, waitingFriends, waitingGroups}}
        case ERRORMESSAGE:
            console.log(action.payload) 
            return state = {...state, user: {} as User, error: action.payload}
        default: 
            return state
    }
}