import React, { FC } from "react"
import { render } from "@testing-library/react"
import { Provider } from "react-redux"
import Modal from "../components/context/modal/Modal"
import { store } from "../reducers/store"
import { ModalTypeEnum } from "../enums/modalType"

const mockToogleModal = jest.fn()
const mockSetBackgroundAnimationState = jest.fn()
const mockRedirectToSecondModal = jest.fn()
const mockHandleSubmit = jest.fn()
const mockFormRef = {
    current: null
}

const renderModal = (modalType: ModalTypeEnum = ModalTypeEnum.signin) => {
    const ModalWithProvider: FC = () => (
        <Provider store={store}>
            <Modal 
                toogleModal={mockToogleModal} 
                setBackgroundAnimationState={mockSetBackgroundAnimationState}
                type={modalType}
            >
                <Modal.Header>{modalType === 'signin' ? 'Sign In' : 'Create your new account'}</Modal.Header>
                <Modal.Form redirectToSecondModal={mockRedirectToSecondModal} ref={mockFormRef} />
                <Modal.Buttons handleSubimt={mockHandleSubmit} />
            </Modal>
        </Provider>
    )
    return render(<ModalWithProvider/>)
}

export default renderModal