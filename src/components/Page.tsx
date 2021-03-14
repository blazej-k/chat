import { FC, useEffect, useState } from "react";
import Chat from "./Chat";
import Form from "./Form";
import useSocket from "./hooks/SocketHook";
// import 
 
const Page: FC = () => {

    const [showChat, setShowChat] = useState(false)
    const [name, setName] = useState('')
    const [messages, setMessages] = useState<string[]>([])
    const [id, setId] = useState('')
    const client = useSocket().client

    useEffect(() => {
        client.on('connect', () => {
            setId(client.id)
            client.emit('setuser', client.id)
        })
        client.on('test', (messages: string[]) => {
            setMessages(messages)
        })
        return () => {
            client.disconnect()
        }
    }, [])
    useEffect(() => {
        if (name.length > 0) setShowChat(true)
    }, [name])

    return (
        <div className="page">
            <h2>CHAT</h2>
            <Form setName={setName}/>
            {showChat && <Chat name={name}/>}
            {messages.length > 0 && <ul>
                {messages.map(mess => (
                    <li key={mess}>{mess}</li>
                ))} 
            </ul>}
        </div>
    );
}
 
export default Page;