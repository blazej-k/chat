import { SIGNUP, SIGNIN, ERRORMESSAGE, JOINTOGROUP, CONFIRMFRIEND, REMOVEFRIENDINVITE , REMOVEGROUPINVITE} from '../actions/UserActions'
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
            return state = {
                ...state,
                user: {
                    login,
                    sex,
                    conversations,
                    waitingFriends,
                    waitingGroups,
                    friends,
                    groups
                }
            }
        case JOINTOGROUP:
            return state = {
                loading: false,
                error: '',
                user: {
                    ...state.user,
                    groups: [
                        ...state.user.groups,
                        action.payload
                    ]
                }
            }
        case CONFIRMFRIEND:
            return state = {
                loading: false,
                error: '',
                user: {
                    ...state.user,
                    friends: [
                        ...state.user.friends,
                        action.payload as Friend
                    ]
                }
            }
        case REMOVEFRIENDINVITE:
            const updatedWaitingFriends = state.user.waitingFriends.filter(inivite => inivite.sender !== action.payload)
            return state = {
                loading: false,
                error: '',
                user: {
                    ...state.user,
                    waitingFriends: updatedWaitingFriends
                }
            }
            case REMOVEGROUPINVITE:
                const updatedWaitingGroups = state.user.waitingGroups.filter(inivite => inivite.groupId !== action.payload)
                return state = {
                    loading: false,
                    error: '',
                    user: {
                        ...state.user,
                        waitingGroups: updatedWaitingGroups
                    }
                }
        case ERRORMESSAGE:
            return state = { ...state, user: {} as User, error: action.payload }
        default:
            return state
    }
}