import { Dispatch } from "react"

export const SIGNUP = 'signup'
export const SIGNIN = 'signin'
export const ERRORMESSAGE = 'errormessage'
export const JOINTOGROUP = 'jointogroup'


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

export const joinToGroup = (group: Group, login: string) => async (dispatch: Dispatch<UserActionType>) => {
    const ENDPOINT = process.env.JOIN_TO_GROUP
    await fetch(ENDPOINT || '', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({group, login}),
    })
    .then(res => res.json())
    .then((res: Group ) => {
        dispatch({type: JOINTOGROUP, payload: res})   
    })
} 