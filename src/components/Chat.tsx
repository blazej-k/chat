import { ChangeEvent, FC, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createGroup } from "../actions/CommunityActions"


const Chat: FC = () => {

    const [groupName, setGroupName] = useState('')

    const dispatch = useDispatch()
    const store = useSelector((store: Store) => store.userReducer)
    const {user: {login, sex}} = store

    const handleButton = () => {
        dispatch(createGroup(groupName, login, sex))
    }

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setGroupName(e.currentTarget.value)
    }

    return (
        <div className="chat">
            <h1>Create group</h1>
            <input type="text" placeholder='group name' value={groupName} onChange={handleInput}/>
            <button onClick={handleButton}>Create!</button>
        </div>
    );
}

export default Chat;