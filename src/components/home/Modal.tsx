import { FC, useEffect, useState } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { removeUserError, userAuth } from "../../actions/UserActions";


interface ModalProps {
    isModalOpen: (value: false) => void,
    type: 'signup' | 'signin'
    redirectModal?: () => void
}

interface FormValues {
    login: string,
    password: string,
    sex?: Sex,
    keepLogIn: boolean
}

interface FormikErrors {
    login: boolean,
    password: boolean,
    sex: boolean,
}

const Modal: FC<ModalProps> = ({ isModalOpen, redirectModal, type }) => {

    const [showModal, setShowModal] = useState(true)
    const [userAuthError, setUserAuthError] = useState('')

    const dispatch = useDispatch()
    const store = useSelector((store: Store) => store.userReducer)

    const formik = useFormik<FormValues>({
        initialValues: {
            login: '',
            password: '',
            sex: '' as Sex,
            keepLogIn: false,
        },
        validate: (values) => {
            const { login, password, sex } = values
            const errors: FormikErrors = {} as FormikErrors
            if (login.length === 0) {
                errors.login = true
            }
            if (password.length === 0) {
                errors.password = true
            }
            if (sex?.length === 0 && type === 'signup') {
                errors.sex = true
            }
            return errors
        },
        onSubmit: values => {
            if (type === 'signin') {
                delete values.sex
            }
            const form: UserAuthInfo = values
            dispatch(userAuth(form))
        }
    })

    useEffect(() => {
        document.addEventListener('click', changeModalClass)
        return () => {
            document.removeEventListener('click', changeModalClass)
            dispatch(removeUserError(store.error))
        }
    }, [])

    useEffect(() => {
        if (store.error && store.error !== userAuthError) {
            setUserAuthError(store.error)
        }
    }, [store])

    const closeModal = () => {
        setShowModal(false)
        //after 0.3s because it's time of scss aniamtion 
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

    const { handleSubmit, handleChange, values: { login, password }, errors } = formik

    return (
        <div className='modal-wrapper' id={!showModal ? 'modal-wrapper-close' : ''}>
            <div className="modal-box">
                <div className='modal sign-in-modal' id={!showModal ? 'modal-close' : ''}>
                    <h1>{type === 'signup' ? 'Create your new account' : 'Sign In'}</h1>
                    {userAuthError && <span className="user-auth-error">{userAuthError}</span>}
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name='login'
                            placeholder='Username'
                            value={login}
                            onChange={handleChange}
                        />
                        {errors.login && <span className='form-validate'>Required</span>}
                        <br />
                        <input
                            type="password"
                            name='password'
                            placeholder='Password'
                            value={password}
                            onChange={handleChange}
                        />
                        {errors.password && <span className='form-validate'>Required</span>}
                        <br />
                        {type === 'signup' &&
                            <div className="sex">
                                <input
                                    type="radio"
                                    name="sex"
                                    value='male'
                                    onChange={handleChange}
                                />
                                <label htmlFor='sex'>Male</label>
                                <input
                                    type="radio"
                                    name="sex"
                                    value='female'
                                    onChange={handleChange}
                                />
                                <label htmlFor='sex'>Female</label>
                                {errors.sex && <span className='form-validate-sex'>Required</span>}
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
                                <button type='submit'>{type === 'signin' ? 'go' : 'save'}</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Modal;