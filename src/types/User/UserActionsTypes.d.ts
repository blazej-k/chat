const SIGNUP = 'signup'
const SIGNIN = 'signin'
const USERLOADING = 'userloading'
const SENDINVITETOFRIEND = 'sendinvitetofriend'
const SENDINVITETOGROUP = 'sendinvitetogroup'
const CONFIRMFRIEND = 'confirmfriendinvite'
const JOINTOGROUP = 'jointogroup'
const REMOVEFRIENDINVITE = 'removefriendinvite'
const REMOVEGROUPINVITE = 'removegroupinvite'
const NEWGROUPMESSAGE = 'newgroupmessage'
const ERRORMESSAGE = 'errormessage'
const REMOVEERRORMESSAGE = 'removeerrormessage'


interface UserAuth {
    type: typeof SIGNUP | typeof SIGNIN,
    payload: User
}

interface UserLoading {
    type: typeof USERLOADING
}

interface JoinToGroup {
    type: typeof JOINTOGROUP,
    payload: Group
}

interface SendInvite {
    type: typeof SENDINVITETOFRIEND | typeof SENDINVITETOGROUP,
    payload: GroupInfo | FriendInfo
}

interface ConfirmFriendsInvite {
    type: typeof CONFIRMFRIEND,
    payload: Friend
}

interface RemoveInvite {
    type: typeof REMOVEFRIENDINVITE | typeof REMOVEGROUPINVITE,
    payload: string
}

interface NewGroupMessage {
    type: typeof NEWGROUPMESSAGE,
    payload: {
        login: string,
        text: string,
        groupId: string
    }
}

interface UserError {
    type: typeof ERRORMESSAGE,
    payload: string
}

interface RemoveUserError {
    type: typeof REMOVEERRORMESSAGE
}

interface UserReducer {
    user: User,
    loading: boolean,
    error: string
}

type UserActionType = UserAuth | UserLoading | UserError | JoinToGroup | SendInvite | ConfirmFriendsInvite |
NewGroupMessage | RemoveInvite | RemoveUserError