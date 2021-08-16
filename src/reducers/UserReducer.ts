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
    LOGOUT,
    GETCURRENTUSER,
    ADDNEWMESSAGE
} from '../actions/UserActions'

const initState: UserReducer = {
    user: {} as User,
    loading: false,
    error: '',
}

export const UserReducer = (state = initState, action: UserActionType) => {
    switch (action.type) {
        case USERLOADING:
            return state = { ...state, loading: true, error: '' }
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
            const group = state.user.groups.find(group => group.groupId === action.payload.groupId)
            if (group) {
                const newMessage = {
                    text: action.payload.text,
                    from: action.payload.login,
                    date: Date.now()
                }
                const updatedGroup: Group = {
                    ...group,
                    dialogues: [
                        ...group.dialogues,
                        newMessage
                    ]
                }
                const updatedGroups = state.user.groups.map(group => {
                    if (group.groupId === action.payload.groupId) {
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
            }
            return state

        case GETCURRENTUSER:
            return state = { loading: false, error: '', user: action.payload }

        case ADDNEWMESSAGE:
            const { from, text, convFriend } = action.payload
            console.log(from, text, convFriend)
            const updatedConv = state.user.conversations
            const conversationObj = updatedConv.find(conversation => conversation.login === convFriend)
            if (!conversationObj) {
                updatedConv.push({
                    login: convFriend,
                    dialogues: []
                })
            }
            updatedConv.forEach(conv => {
                if (conv.login === convFriend) {
                    conv.dialogues.push({
                        date: Date.now(),
                        from: from,
                        text: text
                    })
                }
            })
            state = { ...state, user: { ...state.user, conversations: updatedConv } }
            return state

        case ERRORMESSAGE:
            return state = { ...state, loading: false, error: action.payload }

        case REMOVEERRORMESSAGE:
            return state = { ...state, error: '' }

        case LOGOUT:
            return state = { loading: false, error: '', user: {} as User }
        default:
            return state
    }
}