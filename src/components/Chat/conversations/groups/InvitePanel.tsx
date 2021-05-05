import React, { ChangeEvent, FC, useEffect, useRef } from 'react'
import { AiOutlineSend } from 'react-icons/ai';
import { BiMessageDetail } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { getUsers } from '../../../../actions/CommunityActions';
import { useColor } from '../../../hooks/Hooks';


interface InvitePanelProps {
    sendInvite: () => void,
    handleInput: (e: ChangeEvent<HTMLInputElement>) => void,
    changeInputVisiblity: () => void
    newMember: string
}

const InvitePanel: FC<InvitePanelProps> = ({ newMember, sendInvite, handleInput, changeInputVisiblity }) => {

    const ref = useRef<HTMLInputElement>(null)

    const { secondColor, mainColor } = useColor()

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUsers())
    }, [])

    useEffect(() => {
        ref.current?.addEventListener('keydown', handleEnterClick)
        return () => ref.current?.removeEventListener('keydown', handleEnterClick)
    }, [newMember])

    const handleEnterClick = (e: KeyboardEvent) => {
        if (e.key === 'Enter' && newMember.length > 0) {
            sendInvite()
        }
    }

    return (
        <div className="new-message">
            <div className="add-new-user">
                <button onClick={changeInputVisiblity}>
                    <BiMessageDetail size={45} className={secondColor} />
                </button>
            </div>
            <input value={newMember} ref={ref} className={secondColor} onChange={handleInput} placeholder='New member...' />
            <div className="send">
                <button
                    disabled={!(newMember.length !== 0)}
                    onClick={sendInvite}
                >
                    <AiOutlineSend
                        className={newMember.length !== 0 ? mainColor : 'disabled'}
                    />
                </button>
            </div>
        </div>
    );
}

export default InvitePanel;