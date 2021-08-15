import React, { FC } from "react"
import { render } from "@testing-library/react"
import { Provider } from "react-redux"
import Modal from "../components/home/Modal"
import { store } from "../reducers/store"
import { ModalTypeEnum } from "../enums/modalType"

const mockToogleModal = jest.fn()
const mockSetBackgroundAnimationState = jest.fn()

const renderModal = (modalType: ModalTypeEnum = ModalTypeEnum.signin) => {
    const ModalWithProvider: FC = () => (
        <Provider store={store}>
            <Modal type={modalType as 'signin' | 'signup'} toogleModal={mockToogleModal} setBackgroundAnimationState={mockSetBackgroundAnimationState}/>
        </Provider>
    )
    return render(<ModalWithProvider/>)
}

export default renderModal