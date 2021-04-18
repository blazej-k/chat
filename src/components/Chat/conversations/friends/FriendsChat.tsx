import * as React from 'react';
import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSocket } from '../../../hooks/Hooks';

interface FriendsChatProps {
    friendName: string
}
 
const FriendsChat: FC<FriendsChatProps> = ({friendName}) => {
    const [messages, setMessages] = useState<Dialogues[]>([])

    const {client} = useSocket()

    const {user: {conversations}} = useSelector((state: Store) => state.userReducer)

    console.log(messages)

    useEffect(() => {
        client.on('private message', (res: Dialogues) => {
            setMessages(prev => [...prev, {...res, date: new Date()}])
        })
        conversations.forEach(conversation => {
            if(conversation.login === friendName){
                setMessages(conversation.dialogues)
                return
            }
        });
    }, [])

    return (
        <div className="conversations">
            <div className="header">
                <h1>{friendName}</h1>
            </div>
            <div className="dialogues">
                <ul>
                    {messages.map(message => (
                        <li key={message.date}>{message.text}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
 
export default FriendsChat;