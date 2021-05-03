import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import { useRef } from 'react'
import { AiOutlineSend } from 'react-icons/ai'
import { useColor, useSocket } from '../../../hooks/Hooks'
import Messages from '../friends/Messages'
import NewMessInput from '../NewMessInput'


interface GroupsChatProps {
    groupName: string,
}
 
const GroupsChat: FC<GroupsChatProps> = ({groupName}) => {

    const [messages, setMessages] = useState<Dialogues[]>([])
    const [newMess, setNewMess] = useState('')

    const {client} = useSocket()

    // useEffect(() => {
    //     client.on('private message', (res: { from: string, mess: string }) => {
    //         setMessages(prev => [...prev, res])
    //     })
    // }, [])

    const sendPrivateMess = () => {
        client.emit('send private message', { name: login, to: friendName, mess: newMess })
        dispatch(addNewMessage({ from: login, text: newMess, convFriend: friendName }))
        setMessages(prev => [...prev, {
            date: Date.now(),
            from: login,
            text: newMess
        }])
        setNewMess('')
    }

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setNewMess(e.target.value)
    }

    return (
        <div className="chat-content">
        <div className="conversations">
            <Messages messages={messages} groupName={groupName} />
            <NewMessInput newMess={newMess} sendPrivateMess={sendPrivateMess} handleInput={handleInput}/>
        </div>
    </div>
    );
}
 
export default GroupsChat;