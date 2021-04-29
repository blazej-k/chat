import React, { FC, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router';
import Modal from './modal/Modal';
import Nav from './nav/Nav';
import Home from './home/Home'
import ColorProvider from '../context/ColorContext';
import { useSocket } from '../hooks/Hooks';
import { getUsers } from '../../actions/CommunityActions';
import FriendsChat from './conversations/friends/FriendsChat';
import GroupsChat from './conversations/groups/GroupsChat';
import NewMessInfo, { initNewMessInfo } from '../helpers/NewMessInfo'
import { addNewMessage } from '../../actions/UserActions';

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

const Chat: FC = () => {

    const [showModal, setShowModal] = useState(true)
    const [showFriendChat, setShowFriendChat] = useState(false)
    const [showGroupsChat, setShowGroupsChat] = useState(false)
    const [showHome, setShowHome] = useState(true)
    const [friendName, setFriendName] = useState('')
    const [newMessInfo, setNewMessInfo] = useState<typeof initNewMessInfo>(initNewMessInfo)
    const [groupName, setGroupName] = useState('')
    const [subscribeAsyncTasks, setSubscribeAsyncTasks] = useState(true)

    const { isNew } = useParams<{ isNew: 'true' | 'false' }>()

    const { client, handleDisconnecting, handleConnecting, getNewMess } = useSocket()

    const dispatch = useDispatch()

    const { userReducer: { user: { login, groups, conversations } } } = useSelector((store: Store) => store)

    const showNewMess = (from: string, text: string) => {
        console.log('snm')
        dispatch(addNewMessage({ from, text, convFriend: from }))
        setNewMessInfo(initNewMessInfo)
        setNewMessInfo({ show: true, from, text })
        setTimeout(() => setNewMessInfo(initNewMessInfo), 5000)
    }

    useEffect(() => {
        return () => {
            setSubscribeAsyncTasks(false)
        }
    }, [])

    useEffect(() => {
        if (subscribeAsyncTasks) {
            if (login) {
                client.connected ? client.emit('add user to listeners', login) : handleConnecting(login)
                dispatch(getUsers())
                // if (groups && groups.length > 0) {
                //     groups.forEach(group => {
                //         const { groupId } = group
                //         client.emit('join to group', groupId)
                //     })
                // }
                client.connected ? client.on('private message', ({ text, from }: Dialogues) => {
                    console.log('chat')
                    showNewMess(from, text)
                }) : getNewMess(showNewMess)
            }
        }
        return () => {
            login && handleDisconnecting()
        }
    }, [])

    const friendsChat = (friend: string) => {
        setFriendName(friend)
        setShowGroupsChat(false)
        setShowHome(false)
        setShowFriendChat(true)
    }
    const groupsChat = (group: string) => {
        setGroupName(group)
        setShowFriendChat(false)
        setShowHome(false)
        setShowGroupsChat(true)
    }

    const home = () => {
        setShowFriendChat(false)
        setShowGroupsChat(false)
        setShowHome(true)
    }

    const { from, show, text } = newMessInfo

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
                        <NewMessInfo show={show} text={text} from={from} />
                        <Nav showFriendsChat={friendsChat} showGroupsChat={groupsChat} showHome={home} />
                        <div className="chat-content-wrapper">
                            {showHome && <Home isNew={isNew} />}
                            {showFriendChat && <FriendsChat friendName={friendName} />}
                            {showGroupsChat && <GroupsChat />}
                        </div>
                    </>
                }
            </ColorProvider>
        </motion.div>
    );
}

export default Chat;