import { FC, useEffect, useState } from "react";


interface ModalProps {
    isModalOpen: (value: false) => void,
    type: 'signup' | 'signin'
    redirectModal?: () => void
}

const Modal: FC<ModalProps> = ({ isModalOpen, redirectModal, type }) => {

    const [showModal, setShowModal] = useState(true)

    useEffect(() => {
        document.addEventListener('click', (e) => {
            const { className } = e.target as Element
            if (className === 'modal-wrapper') {
                closeModal()
            }
        })
    }, [])

    const closeModal = () => {
        setShowModal(false)
        setTimeout(() => isModalOpen(false), 300)
    }

    const redirectToSecondModal = () => {
        if (redirectModal) {
            setShowModal(false)
            setTimeout(() => redirectModal(), 300)
        }
    }

    return (
        <div className='modal-wrapper' id={!showModal ? 'modal-wrapper-close' : ''}>
            <div className="modal-box">
                <div className='modal sign-in-modal' id={!showModal ? 'modal-close' : ''}>
                    <h1>{type === 'signup' ? 'Create your new account' : 'Sign In'}</h1>
                    <input type="text" placeholder='Username' /><br />
                    <input type="password" placeholder='Password' /><br />
                    {type === 'signup' &&
                        <div className="sex">
                            <label>
                                <input type="radio" name="sex" value='male' />Male
                            </label>
                            <label>
                                <input type="radio" name="sex" value='female' />Female
                            </label>
                        </div>
                    }
                    <input type="checkbox" name="keep-login" id="keepl-login" />Keep me log in<br />
                    {type === 'signin' && <span className='redirect' onClick={redirectToSecondModal}>Create new acount!</span>}
                    <div className="buttons-wrapper">
                        <div className="buttons">
                            <button onClick={closeModal}>cancel</button>
                            <button>ready</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;