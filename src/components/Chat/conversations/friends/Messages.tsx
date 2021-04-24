import { Avatar } from 'antd';
import React, { FC, MouseEvent } from 'react'
import { useSelector } from 'react-redux';
import { useColor } from '../../../hooks/Hooks';
import date from 'date-and-time'

interface MessagesProps {
    messages: Dialogues[],
    friendName: string
}

const Messages: FC<MessagesProps> = ({ messages, friendName }) => {

    const { user: { login } } = useSelector((state: Store) => state.userReducer)

    const { mainColor, secondColor } = useColor()

    const { format } = date

    const toogleMessDate = (e: MouseEvent<HTMLDivElement>, newClassName: 'date-show' | 'date-hide') => {
        (e.target as Element).previousElementSibling!.previousElementSibling!.className = newClassName
    }

    return (
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
                                    gap={2}>
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
                <h1 className={mainColor}>Start conversation with {friendName}!</h1>
            }
        </div>
    );
}

export default Messages;