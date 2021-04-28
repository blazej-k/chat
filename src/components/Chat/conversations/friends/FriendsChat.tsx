import * as React from 'react';
import { ChangeEvent, FC, useLayoutEffect, useState, MouseEvent, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useColor, useSocket } from '../../../hooks/Hooks';
import { AiOutlineSend } from 'react-icons/ai'
import 'antd/dist/antd.css';
import Messages from './Messages';
import { addNewMessage, getCurrentUser } from '../../../../actions/UserActions';

interface FriendsChatProps {
    friendName: string
}

const FriendsChat: FC<FriendsChatProps> = ({ friendName }) => {

    const [messages, setMessages] = useState<Dialogues[]>([])
    const [newMess, setNewMess] = useState('')

    const { client } = useSocket()
    const { mainColor, secondColor } = useColor()

    const ref = useRef<HTMLInputElement>(null)

    const state = useSelector((state: Store) => state.userReducer)
    const { user: { login, conversations } } = state
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCurrentUser(login))
    }, [])

    useLayoutEffect(() => {
        const conversationObj = conversations.find(conversation => conversation.login === friendName)
        conversationObj ? setMessages(conversationObj.dialogues) : dispatch(getCurrentUser(login))
    }, [conversations])

    useEffect(() => {
        ref.current?.addEventListener('keydown', handleEnterClick)
        return () => ref.current?.removeEventListener('keydown', handleEnterClick)
    }, [newMess])

    useLayoutEffect(() => {
        conversations.forEach(conversation => {
            if (conversation.login === friendName) {
                setMessages(conversation.dialogues)
                return
            }
        });
        return () => setMessages([])
    }, [friendName])

    const handleEnterClick = (e: KeyboardEvent) => {
        if (e.key === 'Enter' && newMess.length > 0) {
            sendPrivateMess()
        }
    }

    const sendPrivateMess = () => {
        client.emit('send private message', { name: login, to: friendName, mess: newMess })
        dispatch(addNewMessage({ from: login, text: newMess, convFriend: friendName }))
        setNewMess('')
    }

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setNewMess(e.target.value)
    }

    return (
        <div className="chat-content">
            <div className="conversations">
                <Messages messages={messages} friendName={friendName} />
                <div className="new-message">
                    <input value={newMess} ref={ref} className={secondColor} onChange={handleInput} placeholder='New mess...' />
                    <div className="send">
                        <button disabled={!(newMess.length > 0)} onClick={sendPrivateMess}>
                            <AiOutlineSend className={newMess.length > 0 ? mainColor : 'disabled'} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FriendsChat;