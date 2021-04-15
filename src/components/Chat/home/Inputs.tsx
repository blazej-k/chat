import * as React from 'react';
import { ChangeEvent, useState } from 'react';
import { useEffect } from 'react';
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createGroup } from '../../../actions/CommunityActions';
import { useColor, useSocket } from '../../hooks/Hooks';


const Inputs: FC = () => {

    const [newFriend, setNewFriend] = useState('')
    const [newGroup, setNewGroup] = useState('')

    const dispatch = useDispatch()
    const { userReducer } = useSelector((state: Store) => state)

    const { color } = useColor()
    const { client } = useSocket()

    const { user: { login, sex, groups, groups: {length} } } = userReducer

    const [userGroupsLength, setUserGroupsLength] = useState(length)

    useEffect(() => {
        if(length > userGroupsLength) {
            setUserGroupsLength(length)
            groups[length - 1]
            client.emit('join to group', groups[length - 1].groupId)
        }
    }, [length])

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target
        if (id === 'friend') {
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

    return (
        <>
            <input type="text" value={newFriend} id='friend' onChange={handleInput} placeholder='Add new friend' />
            <input type="text" value={newGroup} id='group' onChange={handleInput} placeholder='Create new group' />
            <button className={color} onClick={handleCreateGroup}>Create!</button>
        </>
    );
}

export default Inputs;