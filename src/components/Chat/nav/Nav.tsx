import * as React from 'react';
import { FC, MouseEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { confirmFriendsInvite, logOut, removeInvite, joinToGroup } from '../../../actions/UserActions'
import List from './List';
import { MdClear } from 'react-icons/md'
import { MdDone } from 'react-icons/md'

interface NavProps {
    showFriendsChat: (friend: string) => void 
    showGroupsChat: (group: string) => void 
    showHome: () => void
}

export interface NavList<T, N> {
    friends: T | N,
    groups: T | N,
    waitingFriends: T | N,
    waitingGroups: T | N
}

const Nav: FC<NavProps> = ({showFriendsChat, showGroupsChat, showHome}) => {

    const [listsStatus, setListsStatus] = useState<NavList<'collection-close', 'collection-open'>>({
        friends: 'collection-close',
        groups: 'collection-close',
        waitingFriends: 'collection-close',
        waitingGroups: 'collection-close'
    })
    const [showSpanWarning, setShowSpanWarning] = useState(false)

    const { user: { login, friends, groups, waitingFriends, waitingGroups, sex } } = useSelector((store: Store) => store.userReducer)
    const dispatch = useDispatch()

    const handleListStatus = (e: MouseEvent<HTMLSpanElement>) => {
        const { parentElement } = e.target as Element
        if (parentElement?.className === 'collection-close') {
            setListsStatus(prev => {
                return {
                    ...prev,
                    [parentElement.id]: 'collection-open'
                }
            })
        }
        else if (parentElement?.className === 'collection-open') {
            setListsStatus(prev => {
                return {
                    ...prev,
                    [parentElement.id]: 'collection-close'
                }
            })
        }
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

    return (
        <div className="nav">
            <h1>{login}</h1>
            <ul>
                <li onClick={showHome}><b>Home</b></li>
                <List
                    type='friends'
                    list={friends}
                    listsStatus={listsStatus}
                    handleListStatus={handleListStatus}
                    elements={friends.map(({ date, login }) => (
                        <li key={date}>
                            <span onClick={() => showFriendsChat(login)}>{login}</span>
                        </li>
                    ))}
                />
                <List
                    type='groups'
                    list={groups}
                    listsStatus={listsStatus}
                    handleListStatus={handleListStatus}
                    elements={groups.map(({ groupId, groupName }) => (
                        <li key={groupId}>
                            <span onClick={() => showGroupsChat(groupName)}>{groupName}</span>
                        </li>
                    ))}
                />
                <List
                    type='waitingFriends'
                    list={waitingFriends}
                    listsStatus={listsStatus}
                    handleListStatus={handleListStatus}
                    elements={waitingFriends.map(({ sender, date }) => (
                        <li key={date}>
                            <span>
                                {sender}
                            </span>
                            <div className="decission">
                                <MdClear onClick={() => handleNewFriendDecission('reject', sender)} className={'red'} size={25} />
                                <MdDone onClick={() => handleNewFriendDecission('accept', sender)} className={'green'} size={25} />
                            </div>
                        </li>
                    ))}
                />
                <List
                    type='waitingGroups'
                    list={waitingGroups}
                    listsStatus={listsStatus}
                    handleListStatus={handleListStatus}
                    elements={waitingGroups.map(group => (
                        <li key={group.date}>
                            <span>
                                {group.sender}
                            </span>
                            <div className="decission">
                                <MdClear onClick={() => handleNewGroupDecission('reject', group)} className={'red'} size={25} />
                                <MdDone onClick={() => handleNewGroupDecission('accept', group)} className={'green'} size={25} />
                            </div>
                        </li>
                    ))}
                />
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
    );
}

export default Nav;