import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSocket } from '../../../hooks/Hooks'
import Messages from '../friends/Messages'
import NewMessInput from '../NewMessInput'
import { sendInvite as sendGroupInvite } from '../../../../actions/UserActions'


interface GroupsChatProps {
    groupName: string,
}

const GroupsChat: FC<GroupsChatProps> = ({ groupName }) => {

    const [messages, setMessages] = useState<Dialogues[]>([])
    const [newMess, setNewMess] = useState('')

    const { client } = useSocket()

    const { user: { login, groups } } = useSelector((state: Store) => state.userReducer)
    const dispatch = useDispatch()

    const wantedGroup = groups.find(group => group.groupName === groupName)

    const sendGroupMess = () => {
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

    const sendInvite = (recipient: string) => {
        const { groupId, groupName, members } = (wantedGroup as Group)
        const groupInfo: WaitingGroup = {
            groupName,
            groupId,
            sender: login,
            recipient,
            date: new Date(),
            members
        }
        dispatch(sendGroupInvite('group', groupInfo))
    }

    return (
        <div className="chat-content">
            <div className="conversations">
                <Messages messages={messages} groupName={groupName} />
                <NewMessInput
                    newMess={newMess}
                    sendMess={sendGroupMess}
                    handleMessInput={handleInput}
                    type='group'
                    sendGroupInvite={sendInvite}
                />
            </div>
        </div>
    );
}

export default GroupsChat;