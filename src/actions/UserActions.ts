export const SIGNUP = 'signup'

export const signUp = (userInfo: User): SignIn => { 
    return {
        type: SIGNUP,
        payload: userInfo
    }
}