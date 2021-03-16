import { FC, useEffect } from "react"
import useSocket from "./hooks/SocketHook";


const Chat: FC = () => {

    const client = useSocket().client

    // useEffect(() => {
    //     fetch('http://localhost:1000/signIn', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({login: 'blazej', password: '12345'}),
    //         }).then(res => res.json()).then(res => console.log(res))
    //     return () => {
    //         client.disconnect()
    //     }
    // }, [])

    return (
        <div className="chat">
            <p>Chat</p>
            <input type="text" placeholder='To'/>
            <input type="text" placeholder='Mess...'/>
        </div>
    );
}

export default Chat;