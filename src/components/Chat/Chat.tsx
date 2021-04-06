import * as React from 'react';
import { FC } from 'react';
import { useParams } from 'react-router';

interface ChatProps {

}

const Chat: FC<ChatProps> = () => {

    const { isNew } = useParams<{ isNew: 'true' | 'false' }>()

    return (
        <>
            <h1>Welcome to chat!</h1>
            {isNew === 'true' && <h1>New user</h1>}
        </>
    );
}

export default Chat;