import * as React from 'react';
import { ChangeEvent, FC, useLayoutEffect, useState, MouseEvent } from 'react';
import { useSelector } from 'react-redux';
import { useColor, useSocket } from '../../../hooks/Hooks';
import { AiOutlineSend } from 'react-icons/ai'
import date from 'date-and-time'
import 'antd/dist/antd.css';
import { Avatar } from 'antd';

interface FriendsChatProps {
    friendName: string
}

const FriendsChat: FC<FriendsChatProps> = ({ friendName }) => {

    const [messages, setMessages] = useState<Dialogues[]>([])
    const [newMess, setMewMess] = useState('')

    const { client } = useSocket()
    const { mainColor, secondColor } = useColor()

    const { format } = date

    const { user: { conversations, login } } = useSelector((state: Store) => state.userReducer)

    useLayoutEffect(() => {
        client.on('private message', (res: Dialogues) => {
            setMessages(prev => [...prev, { ...res, date: Date.now() }])
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
                    date: Date.now()
                }
            ]
        })
        setMewMess('')
    }

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setMewMess(e.target.value)
    }

    const toogleMessDate = (e: MouseEvent<HTMLDivElement>, newClassName: 'date-show' | 'date-hide') => {
        (e.target as Element).previousElementSibling!.previousElementSibling!.className = newClassName
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
                            {messages.map(({ date, _id, text, from }) => (
                                <li key={_id || date} className={from === login ? 'my-mess' : ''}>
                                    <span className='date-hide'>{date && format(new Date(date), "HH:mm, DD/MM")}</span>
                                    <div className="avatar">
                                        <Avatar
                                            style={{
                                                color: 'white',
                                                backgroundColor: from === login ? mainColor : secondColor,
                                            }}
                                            size='large'
                                            gap={4}>
                                            {from}
                                        </Avatar>
                                    </div>
                                    <div
                                        className={`${from === login ? mainColor : secondColor} mess`}
                                        onMouseOver={(e) => toogleMessDate(e, 'date-show')}
                                        onMouseLeave={(e) => toogleMessDate(e, 'date-hide')}
                                    >
                                        {text}
                                    </div>
                                </li>
                            ))}
                        </ul> :
                        <h1 className={mainColor}>Start conversation with {friendName}!</h1>}
                </div>
                <div className="new-message">
                    <input value={newMess} onChange={handleInput} type="text" placeholder='New mess...' />
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