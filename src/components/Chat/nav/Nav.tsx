import * as React from 'react';
import { FC, MouseEvent, useState } from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../../actions/UserActions'
import List from './List';

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

    const handleLogOut = () => dispatch(logOut())

    const handleSpanMouseHover = (show: boolean) => setShowSpanWarning(show)

    const { user: { login, friends, groups, waitingFriends, waitingGroups } } = store

    const f = friends.map(({date, login}) => <li key={date}>{login}</li>)

    return (
        <div className="nav">
            <h1>{login}</h1>
            <ul>
                <li><AiOutlineHome/></li>
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
                    elements={waitingFriends.map(({ sender, date }) => <li key={date}>{sender}</li>)}
                />
                <List  
                    type='waitingGroups' 
                    list={waitingGroups} 
                    listsStatus={listsStatus} 
                    handleListStatus={handleListStatus} 
                    elements={waitingGroups.map(({ sender, date }) => <li key={date}>{sender}</li>)}
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