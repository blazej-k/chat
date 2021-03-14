import {SIGNUP} from '../actions/UserActions'
const initState: UserReducer = {
    user: {
        name: '',
    },
    loading: false,
    error: '',
}

export const UserReducer = (state = initState, action: UserActionType) => {
    switch(action.type){
        case SIGNUP:
            const {name, sex} = action.payload
            return state = {...state, user: {name, sex}}
        default: 
            return state
    }
}