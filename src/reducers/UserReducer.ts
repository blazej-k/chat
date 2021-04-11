import {
    SIGNUP,
    SIGNIN,
    USERLOADING,
    ERRORMESSAGE,
    JOINTOGROUP,
    CONFIRMFRIEND,
    REMOVEFRIENDINVITE,
    REMOVEGROUPINVITE,
    NEWGROUPMESSAGE,
    REMOVEERRORMESSAGE,
    LOGOUT
} from '../actions/UserActions'

const initState: UserReducer = {
    user: {} as User,
    loading: false,
    error: '',
}

export const UserReducer = (state = initState, action: UserActionType) => {
    switch (action.type) {
        case USERLOADING:
            return state = {...state, loading: true, error: ''}
        case SIGNIN:
        case SIGNUP:
            const { login, sex, conversations, waitingFriends, waitingGroups, friends, groups } = action.payload
            return state = {
                loading: false,
                error: '',
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

        case NEWGROUPMESSAGE:
            const [group] = state.user.groups.filter(group => group.groupId === action.payload.groupId)
            const newMessage = {
                text: action.payload.text,
                login: action.payload.login,
                date: new Date()
            }
            const updatedGroup: Group = {
                ...group,
                dialogues: [
                    ...group.dialogues,
                    newMessage
                ]
            }
            const updatedGroups = state.user.groups.map(group => {
                if(group.groupId === action.payload.groupId){
                    return updatedGroup
                }
                return group
            })
            return state = {
                ...state, 
                user: {
                    ...state.user,
                    groups: updatedGroups
                }
            }
        case ERRORMESSAGE:
            return state = { ...state, loading: false, error: action.payload }
        case REMOVEERRORMESSAGE:
            return state = {...state, error: ''}
        case LOGOUT: 
            return state = {loading: false, error: '', user: {} as User}
        default:
            return state
    }
}