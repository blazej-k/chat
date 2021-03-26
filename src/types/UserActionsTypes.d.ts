const SIGNUP = 'signup'
const SIGNIN = 'signin'
const SENDINVITETOFRIEND = 'sendinvitetofriend'
const SENDINVITETOGROUP = 'sendinvitetogroup'
const CONFIRMFRIEND = 'confirmfriendinvite'
const JOINTOGROUP = 'jointogroup'
const REMOVEFRIENDINVITE = 'removefriendinvite'
const REMOVEGROUPINVITE = 'removegroupinvite'
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
    groupName: string,
    groupId: string,
    date: any,
    members: GroupMembers[]
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

interface ConfirmFriendsInvite {
    type: typeof CONFIRMFRIEND,
    payload: Friend
}

interface RemoveInvite {
    type: typeof REMOVEFRIENDINVITE | typeof REMOVEGROUPINVITE,
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

type UserActionType = UserAuth | UserError | JoinToGroup | SendInvite | ConfirmFriendsInvite | RemoveInvite