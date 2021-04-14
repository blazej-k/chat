import * as React from 'react';
import { motion } from 'framer-motion';
import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router';
import Modal from './modal/Modal';
import Nav from './nav/Nav';
import ChatContent from './ChatHome/Home'
import ColorProvider from '../context/ColorContext';

interface ChatProps {

}

const Chat: FC<ChatProps> = () => {

    const [showModal, setShowModal] = useState(true)

    const { isNew } = useParams<{ isNew: 'true' | 'false' }>()

    const store = useSelector((store: Store) => store.userReducer)

    const animations = {
        in: {
            opacity: 1,
            transition: { duration: 0.6 },
        },
        out: {
            opacity: 0,
            transition: { duration: 0.6 },
        }
    }

    return (
        <motion.div className="chat" variants={animations} initial='out' animate='in'>
            <ColorProvider>
                {!store.user.login ? <Redirect to='/' /> :
                    <>
                        {isNew === 'true' &&
                            <div className="chat-modal">
                                {showModal && <Modal login={store.user.login} showModal={setShowModal} />}
                            </div>
                        }
                        <div className="nav-wrapper">
                            <Nav />
                        </div>
                        <div className="chat-content-wrapper">
                            <ChatContent isNew={isNew} />
                        </div>
                    </>
                }
            </ColorProvider>
        </motion.div>
    );
}

export default Chat;