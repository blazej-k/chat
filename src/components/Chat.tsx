import { ChangeEvent, FC, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createGroup } from "../actions/CommunityActions"
import { joinToGroup as join } from "../actions/UserActions"
import useSocket from "./hooks/SocketHook"


const Chat: FC = () => {

    const [groupName, setGroupName] = useState('')
    const [joinToGroup, setJoinToGroup] = useState(false)

    const dispatch = useDispatch()
    const userStore = useSelector((store: Store) => store.userReducer)
    const commStore = useSelector((store: Store) => store.commReducer)

    const client = useSocket().client
    const { user: { login, sex } } = userStore

    console.log(userStore.user.groups)

    useEffect(() => {
        if (joinToGroup) {
            const { community: { groups } } = commStore
            setJoinToGroup(false)
            const { groupId } = groups[groups.length - 1]
            const { name } = groups[groups.length - 1]
            dispatch(join(groups[groups.length - 1]))
            client.emit('join to group', login, groupId, name)
        }
    }, [commStore])

    const handleButton = () => {
        dispatch(createGroup({ groupName, login, sex }))
        setJoinToGroup(true)
    }

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setGroupName(e.currentTarget.value)
    }

    return (
        <div className="chat">
            <h1>Create group</h1>
            <input type="text" placeholder='group name' value={groupName} onChange={handleInput} />
            <button onClick={handleButton}>Create!</button>
        </div>
    );
}

export default Chat;