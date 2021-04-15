import { Dispatch } from "react"
import addUserToGroup from "./helpers/addUsertoGroup"

export const SIGNUP = 'signup'
export const SIGNIN = 'signin'
export const USERLOADING = 'userloading'
export const ERRORMESSAGE = 'errormessage'
export const REMOVEERRORMESSAGE = 'removeerrormessage'
export const JOINTOGROUP = 'jointogroup'
export const SENDINVITETOFRIEND = 'sendinvitetofriend'
export const SENDINVITETOGROUP = 'sendinvitetogroup'
export const CONFIRMGROUP = 'confirmgroupinvite'
export const CONFIRMFRIEND = 'confirmfriendinvite'
export const REMOVEFRIENDINVITE = 'removefriendinvite'
export const REMOVEGROUPINVITE = 'removegroupinvite'
export const NEWGROUPMESSAGE = 'newgroupmessage'
export const LOGOUT = 'logout'


export const userAuth = (userInfo: UserAuthInfo) => async (dispatch: Dispatch<UserActionType>) => {
    dispatch({type: USERLOADING})
    const isUserExist = 'sex' in userInfo ? false : true
    const ENDPOINT = isUserExist ? process.env.SIGN_IN : process.env.SIGN_UP
    await fetch(ENDPOINT || '', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userInfo),
    })
        .then(res => res.json())
        .then((res: User | { message: string }) => {
            if ('message' in res) {
                dispatch({ type: ERRORMESSAGE, payload: res.message })
            }
            else {
                dispatch({ type: isUserExist ? SIGNIN : SIGNUP, payload: res })
            }
        })
}

export const joinToGroup = (group: Group, login: string, sex: Sex, decision: Decission) => async (dispatch: Dispatch<UserActionType>) => {
    const ENDPOINT = process.env.JOIN_TO_GROUP
    addUserToGroup(ENDPOINT || '', group, login, sex, decision)
        .then(res => res.json())
        .then((res: Group) =>  dispatch({ type: JOINTOGROUP, payload: res }))
}

export const sendInvite = (type: 'friend' | 'group', info: GroupInfo | FriendInfo) => async (dispatch: Dispatch<UserActionType>) => {
    const ENDPOINT = type === 'friend' ? process.env.INVITE_FRIEND : process.env.INVITE_GROUP
    await fetch(ENDPOINT || '', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ info }),
    })
        .then(res => res.json())
        .then((res: {message: string} | true) => {
            if(typeof res !== 'boolean'){
                dispatch({ type: ERRORMESSAGE, payload: res.message })
            }
        })
        .catch(() => dispatch({ type: ERRORMESSAGE, payload: 'We can\'t do this now' }))
}

export const confirmFriendsInvite = (info: ConfirmFriend) => async (dispatch: Dispatch<UserActionType>) => {
    const ENDPOINT = process.env.CONFIRM_FRIEND
    await fetch(ENDPOINT || '', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ info }),
    })
        .then(res => res.json())
        .then((res: Friend) => dispatch({ type: CONFIRMFRIEND, payload: res }))
}

export const removeInvite = (selector: string, type: 'friend' | 'group'): RemoveInvite => {
    if (type === 'friend') {
        return {
            type: REMOVEFRIENDINVITE,
            payload: selector
        }
    }
    else {
        return {
            type: REMOVEGROUPINVITE,
            payload: selector
        }
    }
}

export const removeUserError = () => {
    return {
        type: REMOVEERRORMESSAGE,
    }
}

export const newGroupMessage = (groupId: string, text: string, login: string): NewGroupMessage => {
    return {
        type: NEWGROUPMESSAGE,
        payload: {
            groupId,
            text,
            login
        }
    }
}

export const logOut = (): LogOut => {
    return {
        type: LOGOUT
    }
} 