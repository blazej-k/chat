import React, { createContext, FC, ForwardRefExoticComponent, RefAttributes, useEffect, useMemo, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { removeUserError } from '../../../actions/UserActions'
import Buttons, { ButtonsProps } from './Buttons'
import Form, { FormProps } from './Form'
import '../../../style/modals/Modals.scss'
import { ModalTypeEnum } from '../../../enums/modalType'
import Header from './Header'

interface ModalProps {
    type: ModalTypeEnum,
    setBackgroundAnimationState: (state: 'running' | 'paused') => void,
    toogleModal: (modalType: ModalTypeEnum) => void,
}

interface ModalChildren {
    Form: ForwardRefExoticComponent<FormProps & RefAttributes<HTMLFormElement>>
    Buttons: FC<ButtonsProps>,
    Header: FC
}

export interface ModalContextProps {
    type: ModalTypeEnum,
    setBackgroundAnimationState: (state: 'running' | 'paused') => void,
    setModalAnimationState: (state: 'running' | 'paused') => void,
    closeModal: () => void,
}

export type ModalType = FC<ModalProps> & ModalChildren

let timer: NodeJS.Timeout | null = null

const Modal: ModalType = ({ children, type, setBackgroundAnimationState, toogleModal }) => {

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
        if (modalRef.current) timer = setTimeout(() => setModalAnimationState('paused'), 300)
        return () => {
            timer && clearTimeout(timer)
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
        timer = setTimeout(() => toogleModal(ModalTypeEnum.none), 300)
    }

    const handleClickOutsideModal = (e: MouseEvent) => {
        const { className } = e.target as Element
        className === 'modal-wrapper' && closeModal()
    }

    const conetxtProps = useMemo(() => ({ closeModal, type, setModalAnimationState, setBackgroundAnimationState }), [type])

    return (
        <ModalContext.Provider value={conetxtProps}>
            <div className="modal-box">
                <div
                    data-testid={type === 'signin' ? 'm-sign-in' : 'm-sign-up'}
                    className='modal sign-in-modal'
                    ref={modalRef}
                >
                    {children}
                </div>
            </div>
        </ModalContext.Provider>
    );
}

const ModalContext = createContext<ModalContextProps>({
    type: ModalTypeEnum.none,
    closeModal: () => null,
    setModalAnimationState: () => null,
    setBackgroundAnimationState: () => null
})

Modal.displayName = 'Modal'
Modal.Form = Form
Modal.Buttons = Buttons
Modal.Header = Header

export default Modal
export { ModalContext }