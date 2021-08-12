import React, { FC, memo } from 'react'
import { useModal } from '../../hooks/ContextHooks';

export interface ButtonsProps {
    handleSubimt: () => void
}

const Buttons: FC<ButtonsProps> = ({ handleSubimt }) => {

    const { closeModal, type } = useModal()

    return (
        <div className="buttons-wrapper">
            <div className="buttons">
                <button onClick={closeModal} id='cancel' className='red' type='button'>cancel</button>
                <button onClick={handleSubimt} type='submit' id='submit' className='green'>{type === 'signin' ? 'go' : 'save'}</button>
            </div>
        </div>
    );
}

export default memo(Buttons);