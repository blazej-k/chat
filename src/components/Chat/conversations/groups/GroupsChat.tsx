import React, { ChangeEvent, FC, useEffect, useLayoutEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSocket } from '../../../hooks/Hooks'
import Messages from '../helpers/Messages'
import NewMessInput from '../helpers/NewMessInput'
import { getCurrentUser, newGroupMessage, sendInvite as sendGroupInvite } from '../../../../actions/UserActions'


interface GroupsChatProps {
    groupId: string,
    isNewMess: boolean,
    messAccepted: () => void
}

const GroupsChat: FC<GroupsChatProps> = ({ groupId, isNewMess, messAccepted }) => {

    const [messages, setMessages] = useState<Dialogues[]>([])
    const [newMess, setNewMess] = useState('')

    const { client } = useSocket()

    const { user: { login, groups } } = useSelector((state: Store) => state.userReducer)
    const dispatch = useDispatch()

    useLayoutEffect(() => {
        dispatch(getCurrentUser(login))
    }, [])

    useEffect(() => {
        if (isNewMess) {
            const groupObj = groups.find(group => group.groupId === groupId)
            if (groupObj) {
                messages.length > 0 ?
                    setMessages(prev => [...prev, (groupObj.dialogues.pop() as Dialogues)])
                    : setMessages(groupObj.dialogues)
            }
            else{
                dispatch(getCurrentUser(login))
            }
            messAccepted()
        }
    }, [isNewMess])

    useLayoutEffect(() => {
        if (!isNewMess) {
            groups.forEach(group => {
                if (group.groupId === groupId) {
                    setMessages(group.dialogues)
                    return
                }
            });
        }
        return () => setMessages([])
    }, [groupId])

    const wantedGroup = groups.find(group => group.groupId === groupId)

    const sendGroupMess = () => {
        if (wantedGroup) {
            const { groupId } = wantedGroup
            client.emit('send group message', groupId, newMess, login)
            dispatch(newGroupMessage(groupId, newMess, login))
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
                <Messages messages={messages} groupName={wantedGroup?.groupName} />
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