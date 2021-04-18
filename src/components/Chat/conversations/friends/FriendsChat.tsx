import * as React from 'react';
import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSocket } from '../../../hooks/Hooks';

interface FriendsChatProps {
    friendName: string
}

interface PrivateMess {
    from: string,
    mess: string,
    date?: any
}
 
const FriendsChat: FC<FriendsChatProps> = ({friendName}) => {
    const [messages, setMessages] = useState<PrivateMess[]>([])

    const {client} = useSocket()

    const {user: {conversations}} = useSelector((state: Store) => state.userReducer)

    useEffect(() => {
        client.on('private message', (res: PrivateMess) => {
            setMessages(prev => [...prev, {...res, date: new Date()}])
        })
        let conversationsArrayModel: PrivateMess[] = [];
        conversations.forEach(conversation => {
            if(conversation.login === friendName){
                // const conversationModel = {

                // }
                return
            }
        });
    }, [])

    return (
        <div className="conversations">
            <div className="header">
                <h1>{friendName}</h1>
            </div>
            <div className="dialogues">
                <ul></ul>
            </div>
        </div>
    );
}
 
export default FriendsChat;