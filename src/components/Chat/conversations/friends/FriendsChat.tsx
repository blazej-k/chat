import * as React from 'react';
import { ChangeEvent, FC, useLayoutEffect, useState, MouseEvent, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useColor, useSocket } from '../../../hooks/Hooks';
import { AiOutlineSend } from 'react-icons/ai'
import 'antd/dist/antd.css';
import Messages from './Messages';

interface FriendsChatProps {
    friendName: string
}

const FriendsChat: FC<FriendsChatProps> = ({ friendName }) => {

    const [messages, setMessages] = useState<Dialogues[]>([])
    const [newMess, setMewMess] = useState('')
    const [showNewMessInfo, setShowNewMessInfo] = useState(false)

    const { client } = useSocket()
    const { mainColor, secondColor } = useColor()

    const { user: { conversations, login } } = useSelector((state: Store) => state.userReducer)

    useEffect(() => {
        setTimeout(() => client.on('private message', (res: Dialogues) => {
            setMessages(prev => [...prev, { ...res, date: Date.now() }])
            setShowNewMessInfo(true)
            setTimeout(() => setShowNewMessInfo(false), 5000)
        }), 2000)
    }, [])

    useLayoutEffect(() => {
        conversations.forEach(conversation => {
            if (conversation.login === friendName) {
                setMessages(conversation.dialogues)
                return
            }
        });
        return () => setMessages([])
    }, [friendName])

    const sendPrivateMess = () => {
        client.emit('send private message', { name: login, to: friendName, mess: newMess })
        setMessages(prev => {
            return [
                ...prev,
                {
                    text: newMess,
                    from: login,
                    date: Date.now()
                }
            ]
        })
        setMewMess('')
    }

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setMewMess(e.target.value)
    }

    return (
        <div className="chat-content">
            <div className="conversations">
                {messages.length > 0 && <div className={`${secondColor} new-mess-info`}>
                    <span>{messages[0].from}</span>
                    <span>{messages[0].text}</span>
                </div>}
                <div className='header'>
                    <h1 className={mainColor}><span className={secondColor}>{friendName}</span></h1>
                </div>
                <Messages messages={messages} friendName={friendName}/>
                <div className="new-message">
                    <input value={newMess} className={secondColor} onChange={handleInput} type="text" placeholder='New mess...' />
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