import React, { FC, useEffect, useState } from 'react'
import { useRef } from 'react'
import { AiOutlineSend } from 'react-icons/ai'
import { useColor, useSocket } from '../../../hooks/Hooks'
import Messages from '../friends/Messages'


interface GroupsChatProps {
    groupName: string,
}
 
const GroupsChat: FC<GroupsChatProps> = ({groupName}) => {

    const [messages, setMessages] = useState<Dialogues[]>([])

    const {client} = useSocket()
    const {secondColor} = useColor()

    const ref = useRef(null)

    // useEffect(() => {
    //     client.on('private message', (res: { from: string, mess: string }) => {
    //         setMessages(prev => [...prev, res])
    //     })
    // }, [])

    return (
        <div className="chat-content">
        <div className="conversations">
            {/* <Messages messages={messages} groupName={groupName} />
            <div className="new-message">
                <input value={newMess} ref={ref} className={secondColor} onChange={handleInput} placeholder='New mess...' />
                <div className="send">
                    <button disabled={!(newMess.length > 0)} onClick={sendPrivateMess}>
                        <AiOutlineSend className={newMess.length > 0 ? mainColor : 'disabled'} />
                    </button>
                </div>
            </div> */}
        </div>
    </div>
    );
}
 
export default GroupsChat;