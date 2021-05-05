import React, { ChangeEvent, FC, useEffect, useLayoutEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSocket } from '../../../hooks/Hooks'
import Messages from '../helpers/Messages'
import NewMess from '../helpers/NewMess'
import { getCurrentUser, newGroupMessage, sendInvite as sendGroupInvite } from '../../../../actions/UserActions'
import InvitePanel from './InvitePanel'


interface GroupsChatProps {
    groupId: string,
    isNewMess: boolean,
    messAccepted: () => void
}

const GroupsChat: FC<GroupsChatProps> = ({ groupId, isNewMess, messAccepted }) => {

    const [messages, setMessages] = useState<Dialogues[]>([])
    const [newMess, setNewMess] = useState('')
    const [newMember, setNewMember] = useState('')
    const [showInvitePanel, setShowInvitePanel] = useState(false)

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

    const sendInvite = () => {
        const { groupId, groupName, members } = (wantedGroup as Group)
        const groupInfo: WaitingGroup = {
            groupName,
            groupId,
            sender: login,
            recipient: newMember,
            date: new Date(),
            members
        }
        setNewMember('')
        dispatch(sendGroupInvite('group', groupInfo))
    }

    const showGroupInvitePanel = () => setShowInvitePanel(prev => !prev)

    return (
        <div className="chat-content">
            <div className="conversations">
                {showInvitePanel && <div className="hide-messages"></div>}
                <Messages messages={messages} groupName={wantedGroup?.groupName} />
                {!showInvitePanel ? <NewMess
                    newMess={newMess}
                    sendMess={sendGroupMess}
                    handleInput={handleInput}
                    isGroupShowed={true}
                    changeInputVisiblity={showGroupInvitePanel}
                /> : <InvitePanel
                     newMember={newMember} 
                     handleInput={handleInput} 
                     sendInvite={sendInvite} 
                     changeInputVisiblity={showGroupInvitePanel}
                    />
                }
            </div>
        </div>
    );
}

export default GroupsChat;