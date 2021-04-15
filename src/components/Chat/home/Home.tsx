import * as React from 'react';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import Inputs from './Inputs';
import Preferences from './Preferences';

interface ChatContentProps {
    isNew: 'true' | 'false'
}
 
const ChatContent: FC<ChatContentProps> = ({isNew}) => {

    const userReducer = useSelector((state: Store) => state.userReducer)

    const {user: {login}} = userReducer

    return (
        <div className="chat-content">
            <div className="greeting">
                <h1>Welcome{isNew === 'false' && ' back'}, {login}</h1>
            </div>
            <div className="sections">
                <div className="section">
                    <h2>Community</h2>
                    <div className="inputs-wrapper">
                        <Inputs/>
                    </div>
                </div>
                <div className="section">
                    <h2>Preferences</h2>
                    <div className="preferences-wrapper">
                        <Preferences/>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default ChatContent;