import { Dispatch } from "react"

export const SIGNUP = 'signup'
export const SIGNIN = 'signin'
export const ERRORMESSAGE = 'errormessage'
export const JOINTOGROUP = 'jointogroup'
export const SENDINVITETOFRIEND = 'sendinvitetofriend'
export const SENDINVITETOGROUP = 'sendinvitetogroup'
export const CONFIRMGROUP = 'confirmgroupinvite'
export const CONFIRMFRIEND = 'confirmfriendinvite'
export const REMOVEFRIENDINVITE = 'removefriendinvite'


export const userAuth = (userInfo: UserAuthInfo) => async (dispatch: Dispatch<UserActionType>) => { 
    // dispatch({type: SENDREQUEST})
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
    .then((res: User | {message: string}) => {
        if('message' in res){
            dispatch({type: ERRORMESSAGE, payload: res.message})
        }
        else{
            dispatch({type: isUserExist ? SIGNIN : SIGNUP, payload: res})   
        }
    })
} 

export const joinToGroup = (group: Group, login: string, sex: 'male' | 'female') => async (dispatch: Dispatch<UserActionType>) => {
    const ENDPOINT = process.env.JOIN_TO_GROUP
    await fetch(ENDPOINT || '', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({group, login, sex}),
    })
    .then(res => res.json())
    .then((res: Group ) => {
        dispatch({type: JOINTOGROUP, payload: res})   
    })
}

export const sendInvite = (type: 'friend' | 'group', info: GroupInfo | FriendInfo) => async (dispatch: Dispatch<UserActionType>) => {
    const ENDPOINT = type === 'friend' ? process.env.INVITE_FRIEND : process.env.INVITE_GROUP
    await fetch(ENDPOINT || '', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({info}),
    }).then(res => res.json())
    .catch(() => dispatch({type: ERRORMESSAGE, payload: 'We can\'t do this now'}))
} 

export const confirmInvite = (type: 'friend' | 'group', info: ConfirmFriend | ConfirmGroup) => async (dispatch: Dispatch<UserActionType>) => {
    const ENDPOINT = type === 'friend' ? process.env.CONFIRM_FRIEND : process.env.CONFIRM_GROUP
    await fetch(ENDPOINT || '', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({info}),
    })
    .then(res => res.json())
    .then((res: Friend | Group) => {
        if('sex' in res){
            dispatch({type: CONFIRMFRIEND, payload: res})
        }
        else{ 
            dispatch({type: CONFIRMGROUP, payload: res})
        }
    })
}

export const removeInvite = (login: string, type: 'friend' | 'group'): RemoveInvite => {
    return {
        type: REMOVEFRIENDINVITE,
        payload: login
    }
}