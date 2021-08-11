import React, { createContext, FC, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { removeUserError } from '../../../actions/UserActions'
import Buttons from './Buttons'
import Form, { FormProps } from './Form'
import '../../../style/modals/Modals.scss'

interface ModalProps {
    headerContent: string,
    type: 'signin' | 'signup',
    setBackgroundAnimationState: (state: 'running' | 'paused') => void,
    toogleModal: (show: boolean) => void
}

interface ModalChildren {
    Form: FC<FormProps>
    Buttons: FC
}

export interface ModalContextProps {
    type: 'signin' | 'signup',
    setBackgroundAnimationState: (state: 'running' | 'paused') => void,
    setModalAnimationState: (state: 'running' | 'paused') => void,
    closeModal: () => void,
}

export type ModalType = FC<ModalProps> & ModalChildren

const Modal: ModalType = ({ children, headerContent, type, setBackgroundAnimationState, toogleModal }) => {

    const modalRef = useRef<HTMLDivElement>(null)

    const dispatch = useDispatch()

    useEffect(() => {
        document.addEventListener('click', handleClickOutsideModal)
        return () => {
            document.removeEventListener('click', handleClickOutsideModal)
            dispatch(removeUserError())
        }
    }, [])

    useEffect(() => {
        const timer = setTimeout(() => setModalAnimationState('paused'), 300)
        return () => {
            clearTimeout(timer)
        }
    }, [type])

    const setModalAnimationState = (state: 'running' | 'paused') => {
        modalRef.current!.style.animationPlayState = state
        if (state === 'paused') modalRef.current!.style.opacity = '1'
    }

    const closeModal = () => {
        setBackgroundAnimationState('running')
        setModalAnimationState('running')
        //after 0.3s because it's time of scss aniamtion 
        setTimeout(() => toogleModal(false), 300)
    }

    const handleClickOutsideModal = (e: MouseEvent) => {
        const { className } = e.target as Element
        if (className === 'modal-wrapper') {
            closeModal()
        }
    }

    return (
        <ModalContext.Provider value={{ closeModal, type, setModalAnimationState, setBackgroundAnimationState }}>
            <div className="modal-box">
                <div
                    data-testid={type === 'signin' ? 'm-sign-in' : 'm-sign-up'}
                    className='modal sign-in-modal'
                    ref={modalRef}
                >
                    <h1>{headerContent}</h1>
                    {children}
                </div>
            </div>
        </ModalContext.Provider>
    );
}

const ModalContext = createContext<ModalContextProps>({
    type: 'signin',
    closeModal: () => null,
    setModalAnimationState: () => null,
    setBackgroundAnimationState: () => null
})

Modal.Form = Form
Modal.Buttons = Buttons

export default Modal
export { ModalContext }