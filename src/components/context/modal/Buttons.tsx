import React, { FC } from 'react'
import { useModal } from '../../hooks/ContextHooks';


const Buttons: FC = () => {

    const { closeModal, type } = useModal()

    return (
        <div className="buttons-wrapper">
            <div className="buttons">
                <button onClick={closeModal} id='cancel' className='red' type='button'>cancel</button>
                <button type='submit' id='submit' className='green'>{type === 'signin' ? 'go' : 'save'}</button>
            </div>
        </div>
    );
}

export default Buttons;