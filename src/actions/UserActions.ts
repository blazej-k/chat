import { Dispatch } from "react"

export const SIGNUP = 'signup'
export const SIGNIN = 'signin'


export const signUp = (userInfo: UserAuthInfo) => async (dispatch: Dispatch<UserActionType>) => { 
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
    .then((res: User) => dispatch({type: isUserExist ? SIGNIN : SIGNUP, payload: res}))
} 