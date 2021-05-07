import React, { FC, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router';
import Modal from './modal/Modal';
import Nav from './nav/Nav';
import Home from './home/Home'
import ColorProvider from '../context/ColorContext';
import { useSocket } from '../hooks/Hooks';
import FriendsChat from './conversations/friends/FriendsChat';
import GroupsChat from './conversations/groups/GroupsChat';
import NewMessInfo, { initNewMessInfo } from './conversations/helpers/NewMessInfo'
import { addNewMessage, getCurrentUser, newGroupMessage } from '../../actions/UserActions';
import '../../style/chat/Chat.scss'

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
    const [groupId, setGroupId] = useState('')
    const [subscribeAsyncTasks, setSubscribeAsyncTasks] = useState(true)
    const [isNewPrivateMess, setIsNewPrivateMess] = useState(false)
    const [isNewGroupMess, setIsNewGroupMess] = useState(false)

    const { isNew } = useParams<{ isNew: 'true' | 'false' }>()

    const { client, handleDisconnecting, handleConnecting, getNewPrivateMess, getNewGroupMess } = useSocket()

    const dispatch = useDispatch()

    const { userReducer: { user: { login, groups, conversations } } } = useSelector((store: Store) => store)

    useEffect(() => {
        return () => {
            setSubscribeAsyncTasks(false)
        }
    }, [])

    useEffect(() => {
        if (subscribeAsyncTasks) {
            if (login) {
                if (client.connected) {
                    client.emit('add user to listeners', login)
                    groups.map(({ groupId }) => client.emit('join to group', groupId))
                    client
                        .off('private message')
                        .on('private message', ({ text, from }: Dialogues) => {
                            showNewMess(from, text)
                            const conversationObj = conversations.find(conversation => conversation.login === friendName)
                            !conversationObj && dispatch(getCurrentUser(login))
                        })
                    client
                        .off('group message')
                        .on('group message', (res: { text: string, sender: string, groupId: string }) => {
                            const { sender, groupId } = res
                            showNewMess(sender, res.text, groupId)
                            const groupObj = groups.find(group => group.groupId === groupId)
                            !groupObj && dispatch(getCurrentUser(login))
                        })
                }
                else{
                    handleConnecting(login, groups)
                    getNewPrivateMess(showNewMess)
                    getNewGroupMess(showNewMess)
                }   
            }
        }
        return () => {
            login && handleDisconnecting()
        }
    }, [])

    const showNewMess = (from: string, text: string, groupId?: string) => {
        if (!groupId) {
            dispatch(addNewMessage({ from, text, convFriend: from }))
            setIsNewPrivateMess(true)
        }
        else {
            console.log(groupId, text, from)
            dispatch(newGroupMessage(groupId, text, from))
            setIsNewGroupMess(true)
        }
        setNewMessInfo(initNewMessInfo)
        setNewMessInfo({ show: true, from, text })
        setTimeout(() => setNewMessInfo(initNewMessInfo), 5000)
    }

    const newMessAccepted = () => {
        isNewPrivateMess ? setIsNewPrivateMess(false) : setIsNewGroupMess(false)
    }

    const friendsChat = (friend: string) => {
        setFriendName(friend)
        setShowGroupsChat(false)
        setShowHome(false)
        setShowFriendChat(true)
    }
    const groupsChat = (groupId: string) => {
        setGroupId(groupId)
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
                            {showFriendChat && <FriendsChat
                                friendName={friendName}
                                isNewMess={isNewPrivateMess}
                                messAccepted={newMessAccepted}
                            />}
                            {showGroupsChat && <GroupsChat
                                groupId={groupId}
                                isNewMess={isNewGroupMess}
                                messAccepted={newMessAccepted}
                            />}
                        </div>
                    </>
                }
            </ColorProvider>
        </motion.div>
    );
}

export default Chat;