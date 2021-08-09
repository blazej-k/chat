import React, { FC, memo, MouseEvent, useLayoutEffect, useMemo, useRef } from 'react'
import { useColor } from '../../../hooks/ContextHooks';
import UserAvatar from 'react-user-avatar'

interface MessagesProps {
    messages: Dialogues[],
    friendName?: string,
    groupName?: string,
    login: string
}

interface AvatarProps {
    colors: string | string[],
    name: string
}

const getDate = (date: number) => {
    const days = new Date(date).getDate() < 10 ? `0${new Date(date).getDate()}` : `${new Date(date).getDate()}`
    const months = new Date(date).getMonth() + 1 < 10 ? `0${new Date(date).getMonth() + 1}` : `${new Date(date).getMonth() + 1}`
    const hours = new Date(date).getHours() < 10 ? `0${new Date(date).getHours()}` : `${new Date(date).getHours()}`
    const minutes = new Date(date).getMinutes() < 10 ? `0${new Date(date).getMinutes()}` : `${new Date(date).getMinutes()}`
    return `${days}/${months} ${hours}:${minutes}`
}

let Avatar: FC<AvatarProps> = ({ colors, name }) => (
    <UserAvatar size={60} name={(name).split('').join(' ')} colors={[colors]} />
)
Avatar = memo(Avatar, () => true)

const Messages: FC<MessagesProps> = ({ messages, friendName, groupName, login }) => {

    const { mainColor, secondColor } = useColor()

    const ref = useRef<HTMLUListElement>(null)

    const toogleMessDate = useMemo(() => (e: MouseEvent<HTMLDivElement>, newClassName: 'date-show' | 'date-hide') => {
        (e.target as Element).previousElementSibling!.className = newClassName
    }, [])

    useLayoutEffect(() => {
        messages.length > 0 && ref?.current?.lastElementChild?.scrollIntoView()
    }, [messages])

    return (
        <div className="dialogues">
            {messages.length > 0 ?
                <ul ref={ref}>
                    {messages.map(({ date, _id, text, from }) => (
                        <li key={_id || date} className={from === login ? 'my-mess' : 'other-mess'}>
                            <div className="avatar">
                                <Avatar colors={from === login ? mainColor : secondColor} name={from} />
                            </div>
                            <div className="mess-wrapper">
                                <span className='date-hide'>{date && getDate(date)}</span>
                                <div
                                    className={`${from === login ? mainColor : secondColor} mess`}
                                    onMouseOver={(e) => toogleMessDate(e, 'date-show')}
                                    onMouseLeave={(e) => toogleMessDate(e, 'date-hide')}
                                >
                                    {text}
                                </div>
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