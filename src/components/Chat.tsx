import { FC, useEffect } from "react"
import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";
import { client } from "websocket";
import useSocket from "./hooks/SocketHook";


interface ChatProps {
    name: string
}

// const client = io('localhost:1000', {
//     transports: ['websocket'],
//     reconnection: false,
//     autoConnect: false
// })

const Chat: FC<ChatProps> = ({ name }) => {

    const client = useSocket().client

    useEffect(() => {
        client
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