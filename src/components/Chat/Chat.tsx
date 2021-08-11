import React, { FC, Suspense, useEffect, useState, lazy } from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router';
import Modal from './modal/Modal';
import ColorProvider from '../context/colorContext/ColorContext';
import { useSocket } from '../hooks/ContextHooks';
import NewMessInfo, { initNewMessInfo } from './conversations/helpers/NewMessInfo'
import { addNewMessage, getCurrentUser, newGroupMessage } from '../../actions/UserActions';
import animations from '../helpers/animationConfig'
import { useShowChatView } from '../hooks/ContextHooks';
import { ErrorBoundary } from 'react-error-boundary'
import ErrorChat from './ErrorChat';
import Nav from './nav/Nav';
import '../../style/chat/Chat.scss'
const Home = lazy(() => import('./home/Home'))
const FriendsChat = lazy(() => import('./conversations/friends/FriendsChat'));
const GroupsChat = lazy(() => import('./conversations/groups/GroupsChat'));

const Chat: FC = () => {
    const [showModal, setShowModal] = useState(true)
    const [newMessInfo, setNewMessInfo] = useState<typeof initNewMessInfo>(initNewMessInfo)
    const [subscribeAsyncTasks, setSubscribeAsyncTasks] = useState(true)
    const [isNewPrivateMess, setIsNewPrivateMess] = useState(false)
    const [isNewGroupMess, setIsNewGroupMess] = useState(false)

    const { isNew } = useParams<{ isNew: 'true' | 'false' }>()

    const { client, handleDisconnecting, handleConnecting, getNewPrivateMess, getNewGroupMess } = useSocket()
    const { chatView: { friendName, showFriend, groupId, showGroup, showHome } } = useShowChatView()

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
        return () => { login && handleDisconnecting() }
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

    const { from, show, text } = newMessInfo

    return (
        <ErrorBoundary FallbackComponent={ErrorChat}>
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
                            <Nav />
                            <div className="chat-content-wrapper">
                                <Suspense fallback={<div>Loading...</div>}>
                                    {showHome && <Home isNew={isNew} />}
                                    {showFriend && <FriendsChat
                                        friendName={friendName}
                                        isNewMess={isNewPrivateMess}
                                        messAccepted={newMessAccepted}
                                    />}
                                    {showGroup && <GroupsChat
                                        groupId={groupId}
                                        isNewMess={isNewGroupMess}
                                        messAccepted={newMessAccepted}
                                    />}
                                </Suspense>
                            </div>
                        </>
                    }
                </ColorProvider>
            </motion.div>
        </ErrorBoundary>
    );
}

export default Chat;