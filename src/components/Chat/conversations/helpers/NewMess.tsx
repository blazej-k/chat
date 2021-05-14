import React, { ChangeEvent, FC, useEffect, useRef } from 'react'
import { AiOutlineSend } from 'react-icons/ai';
import { MdPersonAdd } from 'react-icons/md';
import { useColor } from '../../../hooks/Hooks';


interface NewMessInputProps {
    newMess: string,
    isGroupShowed?: boolean,
    sendMess: () => void,
    handleInput: (e: ChangeEvent<HTMLInputElement>) => void,
    changeInputVisiblity?: () => void
}

const NewMessInput: FC<NewMessInputProps> = ({ newMess, sendMess, handleInput, isGroupShowed, changeInputVisiblity}) => {

    const ref = useRef<HTMLInputElement>(null)

    const { secondColor, mainColor } = useColor()

    useEffect(() => {
        ref.current?.focus()
        ref.current?.addEventListener('keydown', handleEnterClick)
        return () => ref.current?.removeEventListener('keydown', handleEnterClick)
    }, [newMess])

    const handleEnterClick = (e: KeyboardEvent) => {
        if (e.key === 'Enter' && newMess.length > 0) {
            sendMess()
        }
    }

    return (
        <>
            <div className="new-message">
                {isGroupShowed && <div className="add-new-user">
                    <button onClick={changeInputVisiblity}>
                        <MdPersonAdd size={45} className={secondColor} />
                    </button>
                </div>}
                <input value={newMess} ref={ref} className={secondColor} onChange={handleInput} placeholder='New mess...' />
                <div className="send">
                    <button
                        disabled={!(newMess.length !== 0)}
                        onClick={sendMess}
                    >
                        <AiOutlineSend
                            className={newMess.length !== 0 ? mainColor : 'disabled'}
                        />
                    </button>
                </div>
            </div>
        </>
    );
}

export default NewMessInput;