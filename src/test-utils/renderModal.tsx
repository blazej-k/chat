import React, { FC } from "react"
import { render } from "@testing-library/react"
import { Provider } from "react-redux"
import Modal from "../components/home/Modal"
import { store } from "../reducers/store"

const mockIsModalOpen = jest.fn()

const renderModal = (modalType: 'signin' | 'signup' = 'signin') => {
    const ModalWithProvider: FC = () => (
        <Provider store={store}>
            <Modal type={modalType} isModalOpen={mockIsModalOpen} />
        </Provider>
    )
    return render(<ModalWithProvider/>)
}

export default renderModal