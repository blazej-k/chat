import React, { FC, useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router';
import Modal from './modal/Modal';
import Nav from './nav/Nav';
import Home from './home/Home'
import ColorProvider from '../context/ColorContext';
import { useSocket } from '../hooks/ContextHooks';
import FriendsChat from './conversations/friends/FriendsChat';
import GroupsChat from './conversations/groups/GroupsChat';
import NewMessInfo, { initNewMessInfo } from './conversations/helpers/NewMessInfo'
import { addNewMessage, getCurrentUser, newGroupMessage } from '../../actions/UserActions';
import animations from '../helpers/animationConfig'
import '../../style/chat/Chat.scss'
import useShowChatView from '../hooks/ChatHooks';
import { ChatView } from '../../enums/chatView'

const Chat: FC = () => {
    const [showModal, setShowModal] = useState(true)
    const [friendName, setFriendName] = useState('')
    const [newMessInfo, setNewMessInfo] = useState<typeof initNewMessInfo>(initNewMessInfo)
    const [groupId, setGroupId] = useState('')
    const [subscribeAsyncTasks, setSubscribeAsyncTasks] = useState(true)
    const [isNewPrivateMess, setIsNewPrivateMess] = useState(false)
    const [isNewGroupMess, setIsNewGroupMess] = useState(false)

    const { isNew } = useParams<{ isNew: 'true' | 'false' }>()

    const { client, handleDisconnecting, handleConnecting, getNewPrivateMess, getNewGroupMess } = useSocket()
    const [{ home: showHome, friends: showFriends, groups: showGroups }, changeChatView] = useShowChatView()

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
                else {
                    handleConnecting(login, groups)
                    getNewPrivateMess(showNewMess)
                    getNewGroupMess(showNewMess)
                }
            }
        }
        return () => {login && handleDisconnecting()}
    }, [])

    const showNewMess = (from: string, text: string, groupId?: string) => {
        if (!groupId) {
            dispatch(addNewMessage({ from, text, convFriend: from }))
            setIsNewPrivateMess(true)
        }
        else {
            dispatch(newGroupMessage(groupId, text, from))
            setIsNewGroupMess(true)
        }
        setNewMessInfo(initNewMessInfo)
        setNewMessInfo({ show: true, from, text })
        setTimeout(() => setNewMessInfo(initNewMessInfo), 5000)
    }

    const newMessAccepted = () => isNewPrivateMess ? setIsNewPrivateMess(false) : setIsNewGroupMess(false)

    const friendsChat = (friend: string) => {
        setFriendName(friend)
        changeChatView(ChatView.friends)
    }

    const groupsChat = (groupId: string) => {
        setGroupId(groupId)
        changeChatView(ChatView.groups)
    }

    const nav = useMemo(() => (
        <Nav showFriendsChat={friendsChat} showGroupsChat={groupsChat} showHome={() => changeChatView(ChatView.home)} />),
    [])

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
                        {nav}
                        <div className="chat-content-wrapper">
                            {showHome && <Home isNew={isNew} />}
                            {showFriends && <FriendsChat
                                friendName={friendName}
                                isNewMess={isNewPrivateMess}
                                messAccepted={newMessAccepted}
                            />}
                            {showGroups && <GroupsChat
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