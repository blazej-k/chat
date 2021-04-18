import React, { FC, useEffect, useState } from 'react'
import { useSocket } from '../../../hooks/Hooks'


interface GroupsChatProps {
    
}
 
const GroupsChat: FC<GroupsChatProps> = () => {

    const [messages, setMessages] = useState<{ from: string, mess: string }[]>([])

    const {client} = useSocket()

    useEffect(() => {
        client.on('private message', (res: { from: string, mess: string }) => {
            setMessages(prev => [...prev, res])
        })
    }, [])

    return (
        <div className="conversations"></div>
    );
}
 
export default GroupsChat;