const SIGNUP = 'signup'
const SIGNIN = 'signin'
const SENDINVITETOFRIEND = 'sendinvitetofriend'
const SENDINVITETOGROUP = 'sendinvitetogroup'
const CONFIRMGROUP = 'confirmgroupinvite'
const CONFIRMFRIEND = 'confirmfriendinvite'
const JOINTOGROUP = 'jointogroup'
const REMOVEFRIENDINVITE = 'removefriendinvite'
const ERRORMESSAGE = 'errormessage'


interface UserAuth<T = typeof SIGNUP | typeof SIGNIN> {
    type: T,
    payload: User
}

interface JoinToGroup {
    type: typeof JOINTOGROUP,
    payload: Group
}

interface FriendInfo {
    sender: string
    recipient: string
}

interface GroupInfo {
    sender: string,
    recipient: string
    groupName: string,
    groupId: string
}

interface ConfirmFriend {
    waiter: string,
    recipient: string,
    decision: 'accept' | 'reject'
}

interface ConfirmGroup {
    groupName: string,
    groupId: string,
    newMember: string
    decission: 'accept' | 'reject'
}

interface SendInvite {
    type: typeof SENDINVITETOFRIEND | typeof SENDINVITETOGROUP,
    payload: GroupInfo | FriendInfo
}

interface ConfirmInvite {
    type: typeof CONFIRMGROUP | typeof CONFIRMFRIEND,
    payload: Friend | Group
}

interface RemoveInvite {
    type: typeof REMOVEFRIENDINVITE,
    payload: string
}

interface UserError {
    type: typeof ERRORMESSAGE,
    payload: string
}

interface UserReducer {
    user: User,
    loading: boolean,
    error: string
}

type UserActionType = UserAuth | UserError | JoinToGroup | SendInvite | ConfirmInvite | RemoveInvite