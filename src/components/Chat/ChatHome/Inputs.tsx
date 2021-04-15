import * as React from 'react';
import { ChangeEvent, useState } from 'react';
import { useEffect } from 'react';
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createGroup } from '../../../actions/CommunityActions';
import { joinToGroup as join } from '../../../actions/UserActions';
import { useColor, useSocket } from '../../hooks/Hooks';

// interface InputsProps {
    
// }
 
const Inputs: FC = () => {

    const [newFriend, setNewFriend] = useState('')
    const [newGroup, setNewGroup] = useState('')

    const dispatch = useDispatch()
    const {userReducer, commReducer} = useSelector((state: Store) => state)

    const {color} = useColor()
    const {client} = useSocket()

    // useEffect(() => {
    //     if (joinToGroup) {
    //         const { community: { groups } } = commReducer
    //         setJoinToGroup(false)
    //         const { groupId } = groups[groups.length - 1]
    //         const { groupName } = groups[groups.length - 1]
    //         const group = {
    //             groupId,
    //             groupName,
    //             members: [],
    //             dialogues: []
    //         }
    //         dispatch(join(group, login, sex, 'accept'))
    //         client.emit('join to group', groupId)
    //     }
    // }, [commReducer])

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        const {id, value} = e.target
        if(id === 'friend'){
            setNewFriend(value)
        }
        else{
            setNewGroup(value)
        }
    }
    
    const handleCreateGroup = () => {
        dispatch(createGroup({groupName: newGroup, login, sex}))
        setNewGroup('')
        setClient()
    }

    const setClient = () => {
        if(error.length === 0) {
            // console.log(commReducer)
            // client.emit('join to group', groupId)
        }
    }

    const {user: {login, sex}, error} = userReducer
 
    return (
        <>
            <input type="text" value={newFriend} id='friend' onChange={handleInput} placeholder='Add new friend'/>
            <input type="text" value={newGroup} id='group' onChange={handleInput} placeholder='Create new group'/>
            <button className={color} onClick={handleCreateGroup}>Create!</button>
        </>
    );
}
 
export default Inputs;