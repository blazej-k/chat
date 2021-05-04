import React, { ChangeEvent, FC, useEffect, useRef } from 'react'
import { useState } from 'react';
import { AiOutlineSend } from 'react-icons/ai';
import { MdPersonAdd } from 'react-icons/md';
import { BiMessageDetail } from 'react-icons/bi'
import { useColor } from '../../../hooks/Hooks';


interface NewMessInputProps {
    newMess: string,
    type?: 'group',
    sendGroupInvite?: (recipient: string) => void
    sendMess: () => void,
    handleMessInput: (e: ChangeEvent<HTMLInputElement>) => void,
    toogleMessages?: () => void
}

const NewMessInput: FC<NewMessInputProps> = ({ newMess, type, sendGroupInvite, sendMess, handleMessInput, toogleMessages }) => {

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
            showMessageInput ? sendMess() : sendGroupInvite && sendGroupInvite(newMember)
        }
    }

    const handleMemberInput = (e: ChangeEvent<HTMLInputElement>) => {
        setNewMember(e.target.value)
    }

    const toogleInput = () => {
        setShowMessageInput(prev => !prev)
        toogleMessages && toogleMessages()
    }

    const sendInvite = () => {
        sendGroupInvite && sendGroupInvite(newMember)
        setNewMember('')
    }

    return (
        <div className="new-message">
            {type && <div className="add-new-user">
                <button onClick={toogleInput}>
                    {showMessageInput ? <MdPersonAdd size={45} className={secondColor} /> :
                        <BiMessageDetail size={45} className={secondColor} />}
                </button>
            </div>}
            {showMessageInput ?
                <input value={newMess} ref={ref} className={secondColor} onChange={handleMessInput} placeholder='New mess...' /> :
                <input value={newMember} ref={ref} className={secondColor} onChange={handleMemberInput} placeholder='New member...' />
            }
            <div className="send">
                <button
                    disabled={!((newMess.length !== 0 && showMessageInput) || newMember.length !== 0)}
                    onClick={showMessageInput ? sendMess : sendInvite}
                >
                    <AiOutlineSend
                        className={(newMess.length !== 0 && showMessageInput) || newMember.length !== 0 ? mainColor : 'disabled'}
                    />
                </button>
            </div>
        </div>
    );
}

export default NewMessInput;