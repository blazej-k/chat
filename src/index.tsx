import { FC, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import Form from './components/Form'
import Chat from './components/Chat'
import { io } from "socket.io-client";

const client = io('localhost:1000', {
    transports: ['websocket'],
    reconnection: false,
    autoConnect: false
})

const App: FC = () => {
    const [showChat, setShowChat] = useState(false)
    const [name, setName] = useState('')
    const [messages, setMessages] = useState<string[]>([])

    useEffect(() => {
        client.connect()
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
            <Form setName={setName} />
            {showChat && <Chat name={name} />}
            {messages.length > 0 && <ul>
                {messages.map(mess => (
                    <li key={mess}>{mess}</li>
                ))} 
            </ul>}
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'))
