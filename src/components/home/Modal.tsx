import React, { FC, useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { removeUserError, userAuth } from "../../actions/UserActions";
import validate from '../helpers/FormikValidate'
import Loader from "react-loader-spinner";
import '../../style/modals/Modals.scss'

interface ModalProps {
    toogleModal: (value: false) => void,
    redirectModal?: () => void,
    setBackgroundAnimationState: (state: 'running' | 'paused') => void
    type: 'signup' | 'signin',
}

const Modal: FC<ModalProps> = ({ toogleModal, redirectModal, setBackgroundAnimationState, type }) => {

    const [userAuthError, setUserAuthError] = useState('')

    const modalRef = useRef<HTMLDivElement>(null)

    const dispatch = useDispatch()
    const store = useSelector((store: Store) => store.userReducer)

    const formik = useFormik<FormValues>({
        initialValues: {
            login: '',
            password: '',
            sex: '' as Sex,
            keepLogIn: false,
        },
        validate: values => validate(values, type),
        onSubmit: values => {
            if (type === 'signin') {
                delete values.sex
            }
            const form: UserAuthInfo = values
            dispatch(userAuth(form))
        }
    })

    useEffect(() => {
        const timer = setTimeout(() => setAnimationState('paused'), 300)
        document.addEventListener('click', handleClickOutsideModal)
        return () => {
            document.removeEventListener('click', handleClickOutsideModal)
            dispatch(removeUserError())
            clearTimeout(timer)
        }
    }, [])

    useEffect(() => {
        if (store.error && store.error !== userAuthError) {
            setUserAuthError(store.error)
        }
    }, [store])

    const setAnimationState = (state: 'running' | 'paused') => {
        modalRef.current!.style.animationPlayState = state
    }

    const closeModal = () => {
        setBackgroundAnimationState('running')
        setAnimationState('running')
        //after 0.3s because it's time of scss aniamtion 
        setTimeout(() => toogleModal(false), 300)
    }

    const redirectToSecondModal = () => {
        setBackgroundAnimationState('running')
        setAnimationState('running')
        setTimeout(() => redirectModal!(), 300)
    }

    const handleClickOutsideModal = (e: MouseEvent) => {
        const { className } = e.target as Element
        if (className === 'modal-wrapper') {
            closeModal()
        }
    }

    const { handleSubmit, handleChange, values: { login, password }, errors } = formik

    return (
        <div className="modal-box">
            <div
                data-testid={type === 'signin' ? 'm-sign-in' : 'm-sign-up'}
                className='modal sign-in-modal'
                ref={modalRef}
            >
                <h1>
                    {type === 'signup' ? 'Create your new account' : 'Sign In'}
                </h1>
                {userAuthError && <span className="user-auth-error">{userAuthError}</span>}
                <form onSubmit={handleSubmit} data-testid='modal-form'>
                    <input
                        type="text"
                        name='login'
                        placeholder='Username'
                        id='login'
                        value={login}
                        onChange={handleChange}
                    />
                    {errors.login && <span className='form-validate'>Required</span>}
                    <br />
                    <input
                        type="password"
                        name='password'
                        id='password'
                        placeholder='Password'
                        value={password}
                        onChange={handleChange}
                    />
                    {errors.password && <span className='form-validate'>Required</span>}
                    <br />
                    {type === 'signup' &&
                        <div className="sex">
                            <label>Male
                                <input
                                    type="radio"
                                    name="sex"
                                    value='male'
                                    onChange={handleChange}
                                />
                            </label>
                            <label>Female
                                <input
                                    type="radio"
                                    name="sex"
                                    value='female'
                                    onChange={handleChange}
                                />
                            </label>
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
                    {store.loading && <div className="loader" data-testid={'loader'}>
                        <Loader type='Watch' color='black' width='40px' />
                    </div>}
                    <div className="buttons-wrapper">
                        <div className="buttons">
                            <button onClick={closeModal} id='cancel' className='red' type='button'>cancel</button>
                            <button type='submit' id='submit' className='green'>{type === 'signin' ? 'go' : 'save'}</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Modal;