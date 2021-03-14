import { FC, useEffect } from "react"
import useSocket from "./hooks/SocketHook";


interface ChatProps {
    name: string
}

const Chat: FC<ChatProps> = ({ name }) => {

    const client = useSocket().client

    useEffect(() => {
        return () => {
            client.disconnect()
        }
    }, [])

    return (
        <div className="chat">
            <p>Chat</p>
            <input type="text" placeholder='To'/>
            <input type="text" placeholder='Mess...'/>
        </div>
    );
}

export default Chat;