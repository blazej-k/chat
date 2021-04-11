import * as React from 'react';
import { FC, MouseEvent, useState } from 'react';
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

    const { user: { friends, groups, waitingFriends, waitingGroups } } = store


    return (
        <div className="nav">
            <ul>
                <li className={listsStatus.friends} id='friends'>
                    <span onClick={(e) => handleListStatus(e)}>Friends</span>
                    <RiArrowRightSLine />
                    {friends.length && listsStatus.friends === 'collection-open' &&
                        <ul>
                            {friends.map(({ date, login }) => (
                                <li key={date}>{login}</li>
                            ))}
                        </ul>
                    }
                </li>
                <li className={listsStatus.groups} id='groups'>
                    <span onClick={(e) => handleListStatus(e)}>Groups</span>
                    <RiArrowRightSLine />
                    {groups.length > 0 && listsStatus.groups === 'collection-open' &&
                        <ul>
                            {groups.map(({ groupName, groupId }) => (
                                <li key={groupId}>{groupName}</li>
                            ))}
                        </ul>
                    }
                </li>
                <li className={listsStatus.waitingFriends} id='waitingFriends'>
                    <span onClick={(e) => handleListStatus(e)}>Waiting groups</span>
                    <RiArrowRightSLine />
                    {waitingFriends.length > 0 && listsStatus.waitingFriends === 'collection-open' &&
                        <ul>
                            {waitingFriends.map(({ sender, date }) => (
                                <li key={date}>{sender}</li>
                            ))}
                        </ul>
                    }
                </li>
                <li>
                    Preferences
                </li>
                <li>
                    <span onClick={handleLogOut}>Log out</span>
                </li>
            </ul>
        </div>
    );
}

export default Nav;