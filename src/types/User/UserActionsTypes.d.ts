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
const GETCURRENTUSER = 'getcurrentuser'
// const ADDNEWMESS = 'addnewmess'
const ERRORMESSAGE = 'errormessage'
const REMOVEERRORMESSAGE = 'removeerrormessage'
const LOGOUT = 'logout'


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

interface GetCurrnetUser {
    type: typeof GETCURRENTUSER,
    payload: User
}

// interface AddNewMess {
//     type: typeof ADDNEWMESS,
//     payload: Dialogues
// }

interface UserError {
    type: typeof ERRORMESSAGE,
    payload: string
}

interface RemoveUserError {
    type: typeof REMOVEERRORMESSAGE
}

interface LogOut {
    type: typeof LOGOUT
}

interface UserReducer {
    user: User,
    loading: boolean,
    error: string
}

type UserActionType = UserAuth | UserLoading | UserError | JoinToGroup | SendInvite | ConfirmFriendsInvite |
NewGroupMessage | GetCurrnetUser /*| AddNewMess |*/ | RemoveInvite | RemoveUserError | LogOut