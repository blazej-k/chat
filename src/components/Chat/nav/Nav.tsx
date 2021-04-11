import * as React from 'react';
import { useMemo, useRef } from 'react';
import { useState } from 'react';
import { FC, MouseEvent } from 'react';

import { RiArrowRightSLine } from 'react-icons/ri';
import { useSelector } from 'react-redux';

interface NavProps {
    
}
 
const Nav: FC<NavProps> = () => {

    const [friendsClassName, setFriendsClassName] = useState('collection-close')
    const [groupsClassName, setGroupsClassName] = useState('collection-close')

    const store = useSelector((store: Store) => store.userReducer)

    const friendsRef = useRef<HTMLLIElement>(null)
    const groupsRef = useRef<HTMLLIElement>(null)

    const handleFriendsLiClick = (e: MouseEvent<HTMLLIElement>) => {
        let {className} = (e.target as Element) 
        if(className === 'collection-close'){
            setFriendsClassName('collection-open')
        }
        else if(className === 'collection-open'){
            setFriendsClassName('collection-close')
        }
    }

    const handleGroupsLiClick = (e: MouseEvent<HTMLLIElement>) => {
        let {className} = (e.target as Element) 
        if(className === 'collection-close'){
            setGroupsClassName('collection-open')
        }
        else if(className === 'collection-open'){
            setGroupsClassName('collection-close')
        }
    }

    const {user: {friends, groups}} = store


    return (
        <div className="nav">
            <ul>
                <li className={friendsClassName} id="friends" ref={friendsRef} onClick={(e) => handleFriendsLiClick(e)}>
                    Friends
                    <RiArrowRightSLine/>
                    {friends.length && friendsClassName === 'collection-open' && 
                        <ul>
                            {friends.map(({date, login}) => (
                                <li key={date}>{login}</li>
                            ))}
                        </ul>
                    }
                </li><br/>
                <li className={groupsClassName} id="groups" ref={groupsRef} onClick={(e) => handleGroupsLiClick(e)}>
                    Groups
                    <RiArrowRightSLine/>
                    {groups.length > 0 && groupsClassName === 'collection-open' && 
                        <ul>
                            {groups.map(({groupName, groupId}) => (
                                <li key={groupId}>{groupName}</li>
                            ))}
                        </ul>
                    }
                </li><br/>
                <li>
                    Preferences
                </li><br/>
                <li>
                    Log out
                </li>
            </ul>
        </div>
    );
}
 
export default Nav;