import React, { ChangeEvent, FC, useEffect, useRef, useState } from 'react'
import { AiOutlineSend } from 'react-icons/ai';
import { BiMessageDetail } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../../../actions/CommunityActions';
import { useColor } from '../../../hooks/Hooks';


interface InvitePanelProps {
    sendInvite: () => void,
    handleInput: (e: ChangeEvent<HTMLInputElement>) => void,
    changeInputVisiblity: () => void
    newMember: string,
    groupId: string
}

const InvitePanel: FC<InvitePanelProps> = ({ newMember, sendInvite, handleInput, changeInputVisiblity, groupId }) => {

    const [searchedUser, setSearchedUser] = useState<CommunityUser | null>(null)

    const ref = useRef<HTMLInputElement>(null)

    const { secondColor, mainColor } = useColor()

    const dispatch = useDispatch()
    const { commReducer: { community: { users, groups } }, userReducer: { user } } = useSelector((state: Store) => state)

    const currentGroupUsers = user.groups
        .find(group => group.groupId === groupId)?.members
        .map(member => member.login)

    useEffect(() => {
        dispatch(getUsers())
    }, [])

    useEffect(() => {
        const newUser = users.find(user => newMember === user.login)
        if (newUser && !currentGroupUsers?.includes(user.login)) {
            setSearchedUser(newUser)
        }
        ref.current?.addEventListener('keydown', handleEnterClick)
        return () => {
            ref.current?.removeEventListener('keydown', handleEnterClick)
            setSearchedUser(null)
        }
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
            <input id='invite' value={newMember} ref={ref} className={secondColor} onChange={handleInput} placeholder='New member...' />
            <div className="send">
                <button
                    disabled={searchedUser ? false : true}
                    onClick={sendInvite}
                >
                    <AiOutlineSend
                        className={searchedUser ? mainColor : 'disabled'}
                    />
                </button>
            </div>
        </div>
    );
}

export default InvitePanel;