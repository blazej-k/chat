import * as React from 'react';
import { FC, MouseEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { confirmFriendsInvite, logOut, removeInvite } from '../../../actions/UserActions'
import List from './List';
import {MdClear} from 'react-icons/md'
import {MdDone} from 'react-icons/md'

export interface NavListProps<T, N> {
    friends: T | N,
    groups: T | N,
    waitingFriends: T | N,
    waitingGroups: T | N
}

const Nav: FC = () => {

    const [listsStatus, setListsStatus] = useState<NavListProps<'collection-close', 'collection-open'>>({
        friends: 'collection-close',
        groups: 'collection-close',
        waitingFriends: 'collection-close',
        waitingGroups: 'collection-close'
    })
    const [showSpanWarning, setShowSpanWarning] = useState(false)

    const store = useSelector((store: Store) => store.userReducer)
    const dispatch = useDispatch()

    const handleListStatus = (e: MouseEvent<HTMLSpanElement>) => {
        const {parentElement} = e.target as Element
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

    const handleUserDecision = (waiter: string, decision: Decission) => {
        const confirm: ConfirmFriend = {
            waiter,
            recipient: login,
            decision
        }
        dispatch(removeInvite(waiter, 'friend'))
        dispatch(confirmFriendsInvite(confirm))
    }

    const handleLogOut = () => dispatch(logOut())

    const handleSpanMouseHover = (show: boolean) => setShowSpanWarning(show)

    const { user: { login, friends, groups, waitingFriends, waitingGroups } } = store

    return (
        <div className="nav">
            <h1>{login}</h1>
            <ul>
                <li><b>Home</b></li>
                <List  
                    type='friends' 
                    list={friends} 
                    listsStatus={listsStatus} 
                    handleListStatus={handleListStatus} 
                    elements={friends.map(({date, login}) => <li key={date}>{login}</li>)}
                />
                <List  
                    type='groups' 
                    list={groups} 
                    listsStatus={listsStatus} 
                    handleListStatus={handleListStatus} 
                    elements={groups.map(({groupId, groupName}) => <li key={groupId}>{groupName}</li>)}
                />
                <List  
                    type='waitingFriends' 
                    list={waitingFriends} 
                    listsStatus={listsStatus} 
                    handleListStatus={handleListStatus} 
                    elements={waitingFriends.map(({ sender, date }) => (
                        <li key={date}>
                            {sender}
                            <div className="decission">
                                <MdClear onClick={() => handleUserDecision(sender, 'reject')} className={'red'} size={25}/>
                                <MdDone onClick={() => handleUserDecision(sender, 'accept')} className={'green'} size={25}/>
                            </div>
                        </li>
                    ))}
                />
                <List  
                    type='waitingGroups' 
                    list={waitingGroups} 
                    listsStatus={listsStatus} 
                    handleListStatus={handleListStatus} 
                    elements={waitingGroups.map(({ sender, date }) => (
                        <li key={date}>
                            {sender}
                            <div className="decission">
                                <MdClear onClick={() => handleUserDecision(sender, 'reject')} className={'red'} size={25}/>
                                <MdDone onClick={() => handleUserDecision(sender, 'accept')} className={'green'} size={25}/>
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