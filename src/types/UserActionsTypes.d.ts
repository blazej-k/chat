const SIGNUP = 'signup'
const SIGNIN = 'signin'


interface UserAuth<T> {
    type: T | typeof SIGNUP | typeof SIGNIN,
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