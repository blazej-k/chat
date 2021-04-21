import React, { createContext, FC, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";
import AOS from 'aos'
import 'aos/dist/aos.css'

interface Context {
    client: Socket<DefaultEventsMap, DefaultEventsMap>,
    handleConnecting: (login: string) => void,
    handleDisconnecting: () => void,
}

const SocketProvider: FC = ({ children }) => {

    const client = io('localhost:1000', {
        transports: ['websocket'],
        reconnection: false,
        autoConnect: true,
        reconnectionDelay: 0,
        randomizationFactor: 0,
    })

    const handleConnecting = (login: string) => {
        client.connect()
        setTimeout(() => client.emit('add user to listeners', login), 2000)
    }

    const handleDisconnecting = () => {
        client.disconnect()
    }

    useEffect(() => {
        AOS.init()
        return () => {
            client.connected && client.disconnect()
        }
    }, [])

    return (
        <SocketContext.Provider value={{ client, handleDisconnecting, handleConnecting }}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketProvider
export const SocketContext = createContext<Context>({
    client: {} as Socket<DefaultEventsMap, DefaultEventsMap>,
    handleDisconnecting: () => undefined,
    handleConnecting: () => undefined
})