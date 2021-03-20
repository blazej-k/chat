const SIGNUP = 'signup'
const SIGNIN = 'signin'
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

interface UserError {
    type: typeof ERRORMESSAGE,
    payload: string
}

interface UserReducer {
    user: User,
    loading: boolean,
    error: string
}

type UserActionType = UserAuth | UserError | JoinToGroup