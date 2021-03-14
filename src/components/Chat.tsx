import { FC, useEffect } from "react"
import { io } from "socket.io-client";


interface ChatProps {
    name: string
}

const client = io('localhost:1000', {
    transports: ['websocket'],
    reconnection: false,
    autoConnect: false
})

const Chat: FC<ChatProps> = ({ name }) => {

    useEffect(() => {
        client
            .connect()
            .emit('test', { name })
        return () => {
            client.disconnect()
        }
    }, [])

    return (
        <div className="chat">
            <p>Chat</p>
        </div>
    );
}

export default Chat;