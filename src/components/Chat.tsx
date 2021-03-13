import { FC, useEffect } from "react"
import { io } from "socket.io-client";


interface ChatProps {
    name: string
}

const Chat: FC<ChatProps> = ({ name }) => {


    // const sendAccount = () => {

    // }
    useEffect(() => {
        console.log(name)
        const client = io('localhost:1000', {
            transports: ['websocket'],
            autoConnect: false,
        })
        // client
        //     .connect()
        //     .emit('test', { name })
    }, [])

    return (
        <div className="chat">
            <p>Chat</p>
            input
        </div>
    );
}

export default Chat;