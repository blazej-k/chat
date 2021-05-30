import React, { FC} from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { logOut } from '../../actions/UserActions'

 
const ErrorChat: FC = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const handleLogOut = () => {
        dispatch(logOut())
        history.push('/')
    }
    return (
        <div className="error">
            <h1>Upsss, we have some error 🧐</h1>
            <h2>We have problem with something, please back to home page and try to sigin in again</h2>
            <button onClick={handleLogOut}>Back</button><br/>
        </div>
    );
}
 
export default ErrorChat;