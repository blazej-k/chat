import * as React from 'react';
import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useColor, useSocket } from '../../../hooks/Hooks';
import {AiOutlineSend} from 'react-icons/ai'

interface FriendsChatProps {
    friendName: string
}

const FriendsChat: FC<FriendsChatProps> = ({ friendName }) => {
    const [messages, setMessages] = useState<Dialogues[]>([])

    const { client } = useSocket()
    const {color} = useColor()

    const { user: { conversations } } = useSelector((state: Store) => state.userReducer)

    useEffect(() => {
        client.on('private message', (res: Dialogues) => {
            setMessages(prev => [...prev, { ...res, date: new Date() }])
        })
        conversations.forEach(conversation => {
            if (conversation.login === friendName) {
                setMessages(conversation.dialogues)
                return
            }
        });
    }, [])

    return (
        <div className="chat-content">
            <div className="conversations">
                <div className="header">
                    <h1>{friendName}</h1>
                </div>
                <div className="dialogues">
                    {messages.length > 0 ? 
                    <ul>
                        {messages.map(message => (
                            <li key={message.date}>{message.text}</li>
                        ))}
                    </ul> :
                    <h1 className={color}>Start conversation with {friendName}!</h1>}
                </div>
                <div className="new-message">
                    <input type="text" placeholder='New mess...'/>
                    <div className="send">
                        <button><AiOutlineSend className={color}/></button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FriendsChat;