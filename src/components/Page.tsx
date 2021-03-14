import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Chat from "./Chat";
import Form from "./Form";
import useSocket from "./hooks/SocketHook";
// import 
 
const Page: FC = () => {

    const [showChat, setShowChat] = useState(false)
    const [nameOfUser, setNameOfuser] = useState('')
    const [messages, setMessages] = useState<string[]>([])
    const client = useSocket().client
    const store = useSelector((store: Store) => store.userReducer)

    useEffect(() => {        
        return () => {
            client.disconnect()
        }
    }, [])

    useEffect(() => {
        const {name} = store.user
        if(nameOfUser !== name){
            setNameOfuser(name)
        }
    }, [store])

    return (
        <div className="page">
            <h2>CHAT</h2>
            <Form showChat={setShowChat}/>
            {showChat && <Chat name={nameOfUser}/>}
            {messages.length > 0 && <ul>
                {messages.map(mess => (
                    <li key={mess}>{mess}</li>
                ))} 
            </ul>}
        </div>
    );
}
 
export default Page;