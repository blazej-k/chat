import React, { FC, memo, MouseEvent, useLayoutEffect, useRef } from 'react'
import { useSelector } from 'react-redux';
import { useColor } from '../../../hooks/ContextHooks';
import UserAvatar from 'react-user-avatar'

interface MessagesProps {
    messages: Dialogues[],
    friendName?: string,
    groupName?: string,
}

const Messages: FC<MessagesProps> = ({ messages, friendName, groupName }) => {

    const { user: { login } } = useSelector((state: Store) => state.userReducer)

    const { mainColor, secondColor } = useColor()

    const ref = useRef<HTMLUListElement>(null)

    const getDate = (date: number) => {
        const days = new Date(date).getDate() < 10 ? `0${new Date(date).getDate()}` : `${new Date(date).getDate()}`
        const months = new Date(date).getMonth() + 1 < 10 ? `0${new Date(date).getMonth() + 1}` : `${new Date(date).getMonth() + 1}`
        const hours = new Date(date).getHours() < 10 ? `0${new Date(date).getHours()}` : `${new Date(date).getHours()}`
        const minutes = new Date(date).getMinutes() < 10 ? `0${new Date(date).getMinutes()}` : `${new Date(date).getMinutes()}`
        return `${days}/${months} ${hours}:${minutes}`
    }

    const toogleMessDate = (e: MouseEvent<HTMLDivElement>, newClassName: 'date-show' | 'date-hide') => {
        (e.target as Element).previousElementSibling!.className = newClassName
    }

    useLayoutEffect(() => {
        messages.length > 0 && ref?.current?.lastElementChild?.scrollIntoView()
    }, [messages])

    return (
        <div className="dialogues">
            {messages.length > 0 ?
                <ul ref={ref}>
                    {messages.map(({ date, _id, text, from }) => (
                        <li key={_id || date} className={from === login ? 'my-mess' : ''}>
                            <div className="avatar">
                                <UserAvatar size={55} name={('fdfdfdfdfdffdfd').split('').join(' ')} colors={[from === login ? mainColor : secondColor]}/>
                            </div>
                            <span className='date-hide'>{date && getDate(date)}</span>
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
                <h1 className={mainColor}>Start conversation with {friendName ? friendName : groupName}!</h1>
            }
        </div>
    );
}

export default memo(Messages);