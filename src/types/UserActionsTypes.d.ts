const SIGNUP = 'signup'
const SIGNIN = 'signin'
const SENDINVITETOFRIEND = 'sendinvitetofriend'
const SENDINVITETOGROUP = 'sendinvitetogroup'
const CONFIRMGROUPINVITE = 'confirmgroupinvite'
const CONFIRMFRIENDINVITE= 'confirmfriendinvite'
const JOINTOGROUP = 'jointogroup'
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
    login: string
}

interface GroupInfo {
    sender: string,
    login: string
    name: string,
    groupId: string
}

interface ConfirmFriend {
    waiter: string,
    recipient: string,
    decission: 'accept' | 'reject'
}

interface ConfirmGroup {
    name: string,
    groupId: string,
    login: string
    decission: 'accept' | 'reject'
}

interface SendInvite<T = typeof SENDINVITETOFRIEND | typeof SENDINVITETOGROUP, K = GroupInfo | FriendInfo> {
    type: T,
    payload: K
}

interface ConfirmInvite<T = typeof CONFIRMGROUPINVITE | typeof CONFIRMFRIENDINVITE, K = GroupInfo | FriendInfo> {
    type: T,
    payload: K
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

type UserActionType = UserAuth | UserError | JoinToGroup | SendInvite