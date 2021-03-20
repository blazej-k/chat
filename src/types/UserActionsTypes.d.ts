const SIGNUP = 'signup'
const SIGNIN = 'signin'
const ERRORMESSAGE = 'errormessage'


interface UserAuth<T = typeof SIGNUP | typeof SIGNIN> {
    type: T,
    payload: User
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

type UserActionType = UserAuth | UserError