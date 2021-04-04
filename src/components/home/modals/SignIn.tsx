import { FC, useEffect, useState } from "react";

interface SignInProps {
    isModalOpen: (value: false) => void
}


const SignIn: FC<SignInProps> = ({ isModalOpen }) => {

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

    return (
        <div className='modal-wrapper' id={!showModal ? 'modal-wrapper-close' : ''}>
            <div className="modal-box">
                <div className='modal' id={!showModal ? 'modal-close' : ''}>
                    <h1>Sign In</h1>
                    <input type="text" placeholder='Username' /><br />
                    <input type="password" placeholder='Password' /><br />
                    <input type="checkbox" name="keep-login" id="keepl-login" />Keep me log in
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

export default SignIn;