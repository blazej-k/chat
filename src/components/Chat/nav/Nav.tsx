import * as React from 'react';
import { FC, MouseEvent, useEffect, useState } from 'react';
import { RiArrowRightSLine } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../../actions/UserActions'

interface NavListProps<T, N> {
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


    return (
        <div className="nav">
            <h1>{login}</h1>
            <ul>
                <li className={listsStatus.friends} id='friends'>
                    {friends.length > 0 ? 
                        <>
                        <span onClick={(e) => handleListStatus(e)}>Friends</span>
                        <RiArrowRightSLine />
                        </> :
                        <>
                            <span className='empty-list'>Friends</span>
                            <RiArrowRightSLine className='empty-list'/>
                        </>
                    }
                    {friends.length > 0 && listsStatus.friends === 'collection-open' &&
                        <ul>
                            {friends.map(({ date, login }) => (
                                <li key={date}>{login}</li>
                            ))}
                        </ul>
                    }
                </li>
                <li className={listsStatus.groups} id='groups'>
                    {groups.length > 0 ? 
                        <>
                            <span onClick={(e) => handleListStatus(e)}>Groups</span>
                            <RiArrowRightSLine />
                        </> :
                        <>
                            <span className='empty-list'>Groups</span>
                            <RiArrowRightSLine className='empty-list'/>
                        </>
                    }
                    {groups.length > 0 && listsStatus.groups === 'collection-open' &&
                        <ul>
                            {groups.map(({ groupName, groupId }) => (
                                <li key={groupId}>{groupName}</li>
                            ))}
                        </ul>
                    }
                </li>
                <li className={listsStatus.waitingFriends} id='waitingFriends'>
                    {waitingFriends.length > 0 ? 
                        <>
                            <span onClick={(e) => handleListStatus(e)}>Waiting friends</span>
                            <RiArrowRightSLine />
                        </> :
                        <>
                            <span className='empty-list'>Waiting friends</span>
                            <RiArrowRightSLine className='empty-list'/>
                        </>
                    }
                    {waitingFriends.length > 0 && listsStatus.waitingFriends === 'collection-open' &&
                        <ul>
                            {waitingFriends.map(({ sender, date }) => (
                                <li key={date}>{sender}</li>
                            ))}
                        </ul>
                    }
                </li>
                <li className={listsStatus.waitingGroups} id='waitingGroups'>
                {waitingGroups.length > 0 ? 
                        <>
                            <span onClick={(e) => handleListStatus(e)}>Waiting groups</span>
                            <RiArrowRightSLine />
                        </> :
                        <>
                            <span className='empty-list'>Waiting groups</span>
                            <RiArrowRightSLine className='empty-list'/>
                        </>
                    }
                    {waitingGroups.length > 0 && listsStatus.waitingGroups === 'collection-open' &&
                        <ul>
                            {waitingGroups.map(({ sender, date }) => (
                                <li key={date}>{sender}</li>
                            ))}
                        </ul>
                    }
                </li>
                <li>
                    Preferences
                </li>
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