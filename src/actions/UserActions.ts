import { Dispatch } from "react"

export const SIGNUP = 'signup'
export const SIGNIN = 'signin'

// const {SIGN_IN, SIGN_UP} = process.env 

console.log(process.env.SIGN_UP)

export const signUp = (userInfo: UserAuthInfo) => async (dispatch: Dispatch<any>) => { 
    // dispatch({type: SENDREQUEST})
    // const user = await fetch('')
    // console.log(SIGN_UP)
    // return {
    //     type: SIGNUP,
    //     payload: userInfo
    // }
} 