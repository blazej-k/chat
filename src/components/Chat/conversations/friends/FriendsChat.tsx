import * as React from 'react';
import { ChangeEvent, FC, useLayoutEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useColor, useSocket } from '../../../hooks/Hooks';
import { AiOutlineSend } from 'react-icons/ai'
import date from 'date-and-time'

interface FriendsChatProps {
    friendName: string
}

const FriendsChat: FC<FriendsChatProps> = ({ friendName }) => {

    const [messages, setMessages] = useState<Dialogues[]>([])
    const [newMess, setMewMess] = useState('')

    const { client } = useSocket()
    const { color } = useColor()

    const { format } = date

    const { user: { conversations, login } } = useSelector((state: Store) => state.userReducer)

    useLayoutEffect(() => {
        client.on('private message', (res: Dialogues) => {
            setMessages(prev => [...prev, { ...res, date: (new Date() as unknown as string) }])
        })
        setMessages([])
        conversations.forEach(conversation => {
            if (conversation.login === friendName) {
                setMessages(conversation.dialogues)
                return
            }
        });
    }, [friendName])

    const sendPrivateMess = () => {
        client.emit('send private message', { name: login, to: friendName, mess: newMess })
        setMessages(prev => {
            return [
                ...prev,
                {
                    text: newMess,
                    from: login,
                    date: (new Date() as unknown as string)
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
                <div className="header">
                    <h1>{friendName}</h1>
                </div>
                <div className="dialogues">
                    {messages.length > 0 ?
                        <ul>
                            {messages.map(({date, _id, text, from}) => (
                                <li key={_id || date} className={from === login ? 'my-mess' : ''}>
                                    <span>{format(new Date(date || ''), "HH:mm, DD/MM")}</span>
                                    <div className={`${color} mess`}>{text}</div>
                                </li>
                            ))}
                        </ul> :
                        <h1 className={color}>Start conversation with {friendName}!</h1>}
                </div>
                <div className="new-message">
                    <input value={newMess} onChange={handleInput} type="text" placeholder='New mess...' />
                    <div className="send">
                        <button disabled={!(newMess.length > 0)} onClick={sendPrivateMess}>
                            <AiOutlineSend className={newMess.length > 0 ? color : 'disabled'} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FriendsChat;