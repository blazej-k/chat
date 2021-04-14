import * as React from 'react';
import { ChangeEvent, useState } from 'react';
import { FC } from 'react';

interface InputsProps {
    
}
 
const Inputs: FC<InputsProps> = () => {

    const [newFriend, setNewFriend] = useState('')
    const [newGroup, setNewGroup] = useState('')

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
            <button>Create!</button>
        </>
    );
}
 
export default Inputs;