import { FC, useEffect, useState } from "react";
import { useFormik } from "formik";


interface ModalProps {
    isModalOpen: (value: false) => void,
    type: 'signup' | 'signin'
    redirectModal?: () => void
}

const Modal: FC<ModalProps> = ({ isModalOpen, redirectModal, type }) => {

    const [showModal, setShowModal] = useState(true)

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            sex: '',
            keepLogIn: false
        },
        onSubmit: values => {
            console.log(values)
        }
    })

    useEffect(() => {
        document.addEventListener('click', changeModalClass)
        return () => {
            document.removeEventListener('click', changeModalClass)
        }
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

    const changeModalClass = (e: MouseEvent) => {
        const { className } = e.target as Element
        if (className === 'modal-wrapper') {
            closeModal()
        }
    }

    const { handleSubmit, handleChange, values: { username, password, keepLogIn } } = formik

    return (
        <div className='modal-wrapper' id={!showModal ? 'modal-wrapper-close' : ''}>
            <div className="modal-box">
                <div className='modal sign-in-modal' id={!showModal ? 'modal-close' : ''}>
                    <h1>{type === 'signup' ? 'Create your new account' : 'Sign In'}</h1>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name='username'
                            placeholder='Username'
                            value={username}
                            onChange={handleChange}
                        /><br />
                        <input
                            type="password"
                            name='password'
                            placeholder='Password'
                            value={password}
                            onChange={handleChange}
                        /><br />
                        {type === 'signup' &&
                            <div className="sex">
                                <input
                                    type="radio"
                                    name="sex"
                                    value='male'
                                    onChange={handleChange}
                                />
                                <label htmlFor='sex'>Male</label><br />
                                <input
                                    type="radio"
                                    name="sex"
                                    value='female'
                                    onChange={handleChange}
                                />
                                <label htmlFor='sex'>Female</label>
                            </div>
                        }
                        <input
                            type="checkbox"
                            name="keepLogIn"
                            onChange={handleChange}
                        />
                        <label htmlFor="keep-login">Keep me log in</label><br />
                        {type === 'signin' && <span className='redirect' onClick={redirectToSecondModal}>Create new acount!</span>}
                        <div className="buttons-wrapper">
                            <div className="buttons">
                                <button onClick={closeModal}>cancel</button>
                                <button type='submit'>ready</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Modal;