import React, { createContext, FC, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";

interface Context {
    client: Socket<DefaultEventsMap, DefaultEventsMap>,
    handleConnecting: (login: string, groups: Group[]) => void,
    handleDisconnecting: () => void,
    getNewPrivateMess: (callback: (from: string, text: string) => void) => void
    getNewGroupMess: (callback: (from: string, text: string, groupId: string) => void) => void
}

const SocketProvider: FC = ({ children }) => {

    //there is 2000 ms because socket work correct after this time

    const client = io('localhost:1000', {
        transports: ['websocket'],
        reconnection: false,
        autoConnect: true,
        reconnectionDelay: 0,
        randomizationFactor: 0,
    })

    const handleConnecting = (login: string, groups: Group[]) => {
        client.connect()
        setTimeout(() => {
            client.emit('add user to listeners', login)
            groups.map(({ groupId }) => client.emit('join to group', groupId))
        }, 2000)
    }

    const getNewPrivateMess = (callback: (from: string, text: string) => void) => {
        setTimeout(() => {
            client
                .off('private message')
                .on('private message', ({ text, from }: Dialogues) => {
                    callback(from, text)
                }), 2000
        })
    }

    const getNewGroupMess = (callback: (from: string, text: string, groupId: string) => void) => {
        setTimeout(() => {
            client
                .off('group message')
                .on('group message', (res: { text: string, sender: string, groupId: string }) => {
                    const { sender, groupId, text } = res
                    callback(sender, text, groupId)
                }), 2000
        })
    }

    const handleDisconnecting = () => {
        client.disconnect()
    }

    useEffect(() => {
        return () => {
            client.connected && client.disconnect()
        }
    }, [])

    return (
        <SocketContext.Provider value={{ client, handleDisconnecting, handleConnecting, getNewPrivateMess, getNewGroupMess }}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketProvider
export const SocketContext = createContext<Context>({
    client: {} as Socket<DefaultEventsMap, DefaultEventsMap>,
    handleDisconnecting: () => undefined,
    handleConnecting: () => undefined,
    getNewPrivateMess: () => undefined,
    getNewGroupMess: () => undefined,
})