import React, { FC, memo, MouseEvent, useEffect, useMemo, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { confirmFriendsInvite, logOut, removeInvite, joinToGroup } from '../../../actions/UserActions'
import { ChatView } from '../../../enums/chatView';
import { useShowChatView } from '../../hooks/ContextHooks';
import { useColor } from '../../hooks/ContextHooks';
import Lists from './Lists';

export interface NavList<T, N> {
    friends: T | N,
    groups: T | N,
    waitingFriends: T | N,
    waitingGroups: T | N
}

const Nav: FC = () => {

    const [listsStatus, setListsStatus] = useState<NavList<'collection-close', 'collection-open'>>({
        friends: 'collection-close',
        groups: 'collection-close',
        waitingFriends: 'collection-close',
        waitingGroups: 'collection-close'
    })
    const [showSpanWarning, setShowSpanWarning] = useState(false)

    const { login, waitingFriends, waitingGroups, sex } = useSelector((store: Store) => store.userReducer.user, shallowEqual)

    const dispatch = useDispatch()

    const { mainColor } = useColor()

    const { changeChatView } = useShowChatView()

    useEffect(() => {
        let collectionToClose: 'waitingGroups' | 'waitingFriends' | '' = ''
        if (waitingFriends.length === 0) collectionToClose = 'waitingFriends'
        if (waitingGroups.length === 0) collectionToClose = 'waitingGroups'
        if (collectionToClose.length > 0) {
            setListsStatus(prev => {
                return {
                    ...prev,
                    [collectionToClose]: 'collection-close'
                }
            })
        }
    }, [waitingFriends, waitingGroups])


    const handleListStatus = (e: MouseEvent<HTMLSpanElement>) => {
        const { parentElement } = e.target as Element
        let newValue: 'collection-close' | 'collection-open'
        if (parentElement?.className === 'collection-close') newValue = 'collection-open'
        else if (parentElement?.className === 'collection-open') newValue = 'collection-close'
        setListsStatus(prev => {
            return {
                ...prev,
                [parentElement!.id]: newValue
            }
        })
    }

    const handleNewFriendDecission = (decision: Decission, waiter: string) => {
        dispatch(removeInvite(waiter, 'friend'))
        const confirm: ConfirmFriend = {
            waiter: waiter,
            recipient: login,
            decision
        }
        dispatch(confirmFriendsInvite(confirm))
    }

    const handleNewGroupDecission = (decision: Decission, group: WaitingGroup) => {
        dispatch(removeInvite(group.groupId, 'group'))
        const { groupId, groupName, members } = group
        const newGroup: Group = {
            groupId,
            groupName,
            members: [...members],
            dialogues: []
        }
        dispatch(joinToGroup(newGroup, login, sex, decision))
    }

    const handleLogOut = () => dispatch(logOut())

    const handleSpanMouseHover = (show: boolean) => setShowSpanWarning(show)

    const listsProps = useMemo(() => ({
        listsStatus, handleListStatus, changeChatView, handleNewFriendDecission, handleNewGroupDecission
    }), [listsStatus, changeChatView, handleNewFriendDecission, handleNewGroupDecission])

    return (
        <div className={`nav-wrapper ${mainColor}`} data-testid='nav'>
            <div className="nav">
                <h1 className={mainColor}>{login}</h1>
                <ul>
                    <li onClick={() => changeChatView(ChatView.home)}><b>Home</b></li>
                    <Lists {...listsProps} />
                    <li>
                        <span
                            onMouseOver={() => handleSpanMouseHover(true)}
                            onMouseLeave={() => handleSpanMouseHover(false)}
                            onClick={handleLogOut}
                        >
                            Log out
                        </span>
                        {showSpanWarning && <span className='log-out-warning'>Are you sure to leave?</span>}
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default memo(Nav);