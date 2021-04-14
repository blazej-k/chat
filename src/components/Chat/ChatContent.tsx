import * as React from 'react';
import { FC } from 'react';
import { useSelector } from 'react-redux';

interface ChatContentProps {
    isNew: 'true' | 'false'
}
 
const ChatContent: FC<ChatContentProps> = ({isNew}) => {

    const userReducer = useSelector((state: Store) => state.userReducer)

    const {user: {login}} = userReducer

    return (
        <div className="chat-content">
            <div className="greeting">
                <h1>Welcome{isNew === 'false' && ' back'}{login}</h1>
            </div>
        </div>
    );
}
 
export default ChatContent;