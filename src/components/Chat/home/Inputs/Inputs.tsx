import * as React from 'react';
import { ChangeEvent, useState } from 'react';
import { useEffect } from 'react';
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createGroup } from '../../../../actions/CommunityActions';
import { sendInvite } from '../../../../actions/UserActions';
import { useColor, useSocket } from '../../../hooks/Hooks';
import SearchList from './SearchList';


const Inputs: FC = () => {

    const [newFriend, setNewFriend] = useState('')
    const [newGroup, setNewGroup] = useState('')
    const [confirmNewFriend, setConfirmNewFriend] = useState(false)

    const dispatch = useDispatch()
    const { userReducer } = useSelector((state: Store) => state)

    const { color } = useColor()
    const { client } = useSocket()

    const { user: { login, sex, groups, groups: { length } } } = userReducer

    const [userGroupsLength, setUserGroupsLength] = useState(length)

    useEffect(() => {
        if (length > userGroupsLength) {
            setUserGroupsLength(length)
            groups[length - 1]
            client.emit('join to group', groups[length - 1].groupId)
        }
    }, [length])

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target
        if (id === 'friend' || id === 'search-friend') {
            setNewFriend(value)
        }
        else {
            setNewGroup(value)
        }
    }

    const handleCreateGroup = () => {
        dispatch(createGroup({ groupName: newGroup, login, sex }))
        setNewGroup('')
    }

    const handleSelectFriend = (recipient: string) => {
        // dispatch(sendInvite('friend', { sender: login, recipient}))
        setNewFriend('')
        setConfirmNewFriend(true)
        setTimeout(() => {
            setConfirmNewFriend(false)
        }, 2000)
    }

    return (
        <>
            <input type="text" value={newFriend} id={newFriend.length > 2 ? 'search-friend' : 'friend'} onChange={handleInput} placeholder='Add new friend' />
            {confirmNewFriend && <span className='confirm-new-friend'>Invite sended!</span>}
            {newFriend.length > 2 && <SearchList friendName={newFriend} handleSelectFriend={handleSelectFriend}/>}
            <input type="text" value={newGroup} id='group' onChange={handleInput} placeholder='Create new group' />
            <button className={color} onClick={handleCreateGroup}>Create!</button>
        </>
    );
}

export default Inputs;