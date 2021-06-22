import React, { ChangeEvent, FC, useLayoutEffect, useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSocket } from '../../../hooks/ContextHooks';
import Messages from '../helpers/Messages';
import { addNewMessage, getCurrentUser } from '../../../../actions/UserActions';
import NewMess from '../helpers/NewMess';

interface FriendsChatProps {
    friendName: string,
    isNewMess: boolean,
    messAccepted: () => void
}

const FriendsChat: FC<FriendsChatProps> = ({ friendName, isNewMess, messAccepted }) => {

    const [messages, setMessages] = useState<Dialogues[]>([])
    const [newMess, setNewMess] = useState('')

    const { client } = useSocket()

    const { login, conversations } = useSelector((state: Store) => state.userReducer.user)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCurrentUser(login))
    }, [])

    useEffect(() => {
        if (isNewMess) {
            const conversationObj = conversations.find(conversation => conversation.login === friendName)
            if (conversationObj) {
                messages.length > 0 ?
                    setMessages(prev => [...prev, (conversationObj.dialogues.pop() as Dialogues)])
                    : setMessages(conversationObj.dialogues)
            }
            else {
                dispatch(getCurrentUser(login))
            }
            messAccepted()
        }
    }, [isNewMess])

    useLayoutEffect(() => {
        if (!isNewMess) {
            conversations.forEach(conversation => {
                if (conversation.login === friendName) {
                    setMessages(conversation.dialogues)
                    return
                }
            });
        }
        return () => setMessages([])
    }, [friendName])

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

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => setNewMess(e.target.value)

    return (
        <div className="chat-content">
            <div className="conversations">
                <Messages messages={messages} friendName={friendName} login={login}/>
                <NewMess handleInput={handleInput} sendMess={sendPrivateMess} newMess={newMess} />
            </div>
        </div>
    );
}

export default FriendsChat;