import React, { createContext, FC, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";
import { Provider } from 'react-redux'
import { store } from "../../reducers/store";
import AOS from 'aos'
import 'aos/dist/aos.css'

interface Context {
    client: Socket<DefaultEventsMap, DefaultEventsMap>
}

const SocketProvider: FC = ({ children }) => {

    const client = io('localhost:1000', {
        transports: ['websocket'],
        reconnection: false,
        autoConnect: false
    })

    useEffect(() => {
        AOS.init()
        client.connect()
        return () => {
            client.disconnect()
        }
    }, [])

    return (
        <SocketContext.Provider value={{ client }}>
            <Provider store={store}>
                {children}
            </Provider>
        </SocketContext.Provider>
    )
}

export default SocketProvider
export const SocketContext = createContext<Context>({ client: {} as Socket<DefaultEventsMap, DefaultEventsMap> })