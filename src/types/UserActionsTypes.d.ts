const SIGNUP = 'signup'
const SIGNIN = 'signin'


interface UserAuth<T = typeof SIGNUP | typeof SIGNIN> {
    type: T,
    payload: User
}

interface UserReducer {
    user: User,
    loading: boolean,
    error: string
}

interface Store {
    userReducer: UserReducer
}

type UserActionType = UserAuth