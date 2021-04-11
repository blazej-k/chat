import * as React from 'react';
import { FC, MouseEvent, useState } from 'react';
import { RiArrowRightSLine } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../../actions/UserActions'

interface NavProps {

}

const Nav: FC<NavProps> = () => {

    const [friendsClassName, setFriendsClassName] = useState('collection-close')
    const [groupsClassName, setGroupsClassName] = useState('collection-close')

    const store = useSelector((store: Store) => store.userReducer)
    const dispatch = useDispatch()

    const handleFriendsLiClick = (e: MouseEvent<HTMLSpanElement>) => {
        const { parentElement } = (e.target as Element)
        if (parentElement?.className === 'collection-close') {
            setFriendsClassName('collection-open')
        }
        else if (parentElement?.className === 'collection-open') {
            setFriendsClassName('collection-close')
        }
    }

    const handleGroupsLiClick = (e: MouseEvent<HTMLSpanElement>) => {
        const { parentElement } = (e.target as Element)
        if (parentElement?.className === 'collection-close') {
            setGroupsClassName('collection-open')
        }
        else if (parentElement?.className === 'collection-open') {
            setGroupsClassName('collection-to-close')
        }
    }

    const handleLogOut = () => dispatch(logOut())

    const { user: { friends, groups } } = store


    return (
        <div className="nav">
            <ul>
                <li className={friendsClassName}>
                    <span onClick={(e) => handleFriendsLiClick(e)}>Friends</span>
                    <RiArrowRightSLine />
                    {friends.length && friendsClassName === 'collection-open' &&
                        <ul>
                            {friends.map(({ date, login }) => (
                                <li key={date}>{login}</li>
                            ))}
                        </ul>
                    }
                </li><br />
                <li className={groupsClassName}>
                    <span onClick={(e) => handleGroupsLiClick(e)}>Groups</span>
                    <RiArrowRightSLine />
                    {groups.length > 0 && groupsClassName === 'collection-open' &&
                        <ul>
                            {groups.map(({ groupName, groupId }) => (
                                <li key={groupId}>{groupName}</li>
                            ))}
                        </ul>
                    }
                </li><br />
                <li>
                    Preferences
                </li><br />
                <li>
                    <span onClick={handleLogOut}>Log out</span>
                </li>
            </ul>
        </div>
    );
}

export default Nav;