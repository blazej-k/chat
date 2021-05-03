import React, { ChangeEvent, FC, useEffect, useRef } from 'react'
import { useState } from 'react';
import { AiOutlineSend } from 'react-icons/ai';
import { MdPersonAdd } from 'react-icons/md';
import {BiMessageDetail} from 'react-icons/bi'
import { useColor } from '../../hooks/Hooks';


interface NewMessInputProps {
    newMess: string,
    type?: 'group'
    sendMess: () => void,
    handleMessInput: (e: ChangeEvent<HTMLInputElement>) => void
}

const NewMessInput: FC<NewMessInputProps> = ({ newMess, type, sendMess, handleMessInput }) => {

    const [showMessageInput, setShowMessageInput] = useState(true)
    const [newMember, setNewMember] = useState('')

    const ref = useRef<HTMLInputElement>(null)

    const { secondColor, mainColor } = useColor()

    useEffect(() => {
        ref.current?.addEventListener('keydown', handleEnterClick)
        return () => ref.current?.removeEventListener('keydown', handleEnterClick)
    }, [newMess])

    const handleEnterClick = (e: KeyboardEvent) => {
        if (e.key === 'Enter' && newMess.length > 0) {
            showMessageInput ? sendMess() : null
        }
    }

    const handleMemberInput = (e: ChangeEvent<HTMLInputElement>) => {
        setNewMember(e.target.value)
    }

    const toogleInput = () => setShowMessageInput(prev => !prev)

    return (
        <div className="new-message">
            {type && <div className="add-new-user">
                <button onClick={toogleInput}>
                    {showMessageInput ? <MdPersonAdd size={45} className={secondColor}/> : 
                    <BiMessageDetail  size={45} className={secondColor}/>}
                </button>
            </div>}
            {showMessageInput ?
                <input value={newMess} ref={ref} className={secondColor} onChange={handleMessInput} placeholder='New mess...' /> :
                <input value={newMember} ref={ref} className={secondColor} onChange={handleMemberInput} placeholder='New member...' />
            }
            <div className="send">
                <button disabled={!(newMess.length > 0)} onClick={sendMess}>
                    <AiOutlineSend className={newMess.length > 0 ? mainColor : 'disabled'} />
                </button>
            </div>
        </div>
    );
}

export default NewMessInput;