import * as React from 'react';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import Modal from './Modal';

interface ChatProps {

}

const Chat: FC<ChatProps> = () => {

    const { isNew } = useParams<{ isNew: 'true' | 'false' }>()

    const store = useSelector((store: Store) => store.userReducer)

    return (
        <>
            <h1>Welcome to chat!</h1>
            {isNew === 'true' && 
                <div className="modal-full-screen">
                    <Modal login={store.user.login}/>
                </div>
            }
        </>
    );
}

export default Chat;