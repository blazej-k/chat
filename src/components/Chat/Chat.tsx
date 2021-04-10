import * as React from 'react';
import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router';
import Modal from './modal/Modal';
import Nav from './nav/Nav';

interface ChatProps {

}

const Chat: FC<ChatProps> = () => {

    const [showModal, setShowModal] = useState(true)

    const { isNew } = useParams<{ isNew: 'true' | 'false' }>()

    const store = useSelector((store: Store) => store.userReducer)

    return (
        <>
            {isNew === 'true' && 
                <div className="modal-full-screen">
                    {showModal && <Modal login={store.user.login} showModal={setShowModal}/>}
                </div>
            }
            <div className="nav-wrapper">
                <Nav/>
            </div>
        </>
    );
}

export default Chat;