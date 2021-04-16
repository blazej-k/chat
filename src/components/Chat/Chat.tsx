import * as React from 'react';
import { motion } from 'framer-motion';
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router';
import Modal from './modal/Modal';
import Nav from './nav/Nav';
import ChatContent from './home/Home'
import ColorProvider from '../context/ColorContext';
import { useSocket } from '../hooks/Hooks';
import { getUsers } from '../../actions/CommunityActions';


const Chat: FC = () => {

    const [showModal, setShowModal] = useState(true)

    const { isNew } = useParams<{ isNew: 'true' | 'false' }>()

    const {client} = useSocket()

    const dispatch = useDispatch()

    const {userReducer: {user: {login, groups}}, commReducer} = useSelector((store: Store) => store)

    useEffect(() => {
        client.emit('add user to listeners', login)
        if(groups && groups.length > 0){
            groups.forEach(group => {
                const { groupId } = group
                client.emit('join to group', groupId) 
            })
        }
        dispatch(getUsers())
    }, [])

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
                {!login ? <Redirect to='/' /> :
                    <>
                        {isNew === 'true' &&
                            <div className="chat-modal">
                                {showModal && <Modal login={login} showModal={setShowModal} />}
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