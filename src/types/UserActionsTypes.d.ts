// import { SIGNIN } from "../actions/UserActions";
const SIGNUP = 'signup'

interface SignIn {
    type: typeof SIGNUP
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

type UserActionType = SignIn