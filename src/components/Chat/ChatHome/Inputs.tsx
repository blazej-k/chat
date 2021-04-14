import * as React from 'react';
import { ChangeEvent, useState } from 'react';
import { FC } from 'react';
import { useColor } from '../../hooks/Hooks';

interface InputsProps {
    
}
 
const Inputs: FC<InputsProps> = () => {

    const [newFriend, setNewFriend] = useState('')
    const [newGroup, setNewGroup] = useState('')

    const {color} = useColor()

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        const {id, value} = e.target
        if(id === 'friend'){
            setNewFriend(value)
        }
        else{
            setNewGroup(value)
        }
    }    
 
    return (
        <>
            <input type="text" value={newFriend} id='friend' onChange={handleInput} placeholder='Add new friend'/>
            <input type="text" value={newGroup} id='group' onChange={handleInput} placeholder='Create new group'/>
            <button className={color}>Create!</button>
        </>
    );
}
 
export default Inputs;