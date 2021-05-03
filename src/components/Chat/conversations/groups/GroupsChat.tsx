import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import { useRef } from 'react'
import { AiOutlineSend } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { addNewMessage } from '../../../../actions/UserActions'
import { useColor, useSocket } from '../../../hooks/Hooks'
import Messages from '../friends/Messages'
import NewMessInput from '../NewMessInput'


interface GroupsChatProps {
    groupName: string,
}

const GroupsChat: FC<GroupsChatProps> = ({ groupName }) => {

    const [messages, setMessages] = useState<Dialogues[]>([])
    const [newMess, setNewMess] = useState('')

    const { client } = useSocket()

    const { user: { login, groups } } = useSelector((state: Store) => state.userReducer)

    const sendGroupMess = () => {
        const wantedGroup = groups.find(group => group.groupName === groupName)
        if (wantedGroup) {
            const { groupId } = wantedGroup
            client.emit('send group message', { groupId, message: newMess, from: login })
            setMessages(prev => [...prev, {
                date: Date.now(),
                from: login,
                text: newMess
            }])
        }
        setNewMess('')
    }

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setNewMess(e.target.value)
    }

    return (
        <div className="chat-content">
            <div className="conversations">
                <Messages messages={messages} groupName={groupName} />
                <NewMessInput newMess={newMess} sendMess={sendGroupMess} handleInput={handleInput} />
            </div>
        </div>
    );
}

export default GroupsChat;