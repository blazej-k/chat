import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import Modal from './Modal'
import { Provider } from 'react-redux';
import { store } from '../../reducers/store';
import '@testing-library/jest-dom/extend-expect';


const mockIsModalOpen = jest.fn()
const createModal = (type: 'signin' | 'signup') => <Provider store={store}><Modal type={type} isModalOpen={mockIsModalOpen} /></Provider>


beforeEach(() => {
    global.fetch = jest.fn(() => Promise.resolve({
        json: () => Promise.resolve({}),
    } as Response))
})

describe('Modal', () => {
    it('should prevent sending data if username is empty', () => {
        const ModalProvider = createModal('signin')
        const { getByPlaceholderText } = render(ModalProvider)
        const passwordInput = getByPlaceholderText('Password')
        fireEvent.change(passwordInput, { target: { value: 'pass' } })
        fireEvent.submit(screen.getByTestId('modal-form'))
        expect(global.fetch).not.toBeCalled()
    })

    it('should prevent sending data if password is empty', () => {
        const ModalProvider = createModal('signin')
        const { getByPlaceholderText } = render(ModalProvider)
        const loginInput = getByPlaceholderText('Username')
        fireEvent.change(loginInput, { target: { value: 'username' } })
        fireEvent.submit(screen.getByTestId('modal-form'))
        expect(global.fetch).not.toBeCalled()
    })

    it('should prevent sending data if sex is empty', () => {
        const ModalProvider = createModal('signup')
        render(ModalProvider)
        const { getByPlaceholderText } = screen
        const loginInput = getByPlaceholderText('Username')
        const passwordInput = getByPlaceholderText('Password')
        fireEvent.change(loginInput, { target: { value: 'username' } })
        fireEvent.change(passwordInput, { target: { value: 'pass' } })
        fireEvent.submit(screen.getByTestId('modal-form'))
        expect(global.fetch).not.toBeCalled()
    })

    it('should sign in', async () => {
        const ModalProvider = createModal('signin')
        render(ModalProvider)
        const { getByPlaceholderText } = screen
        const loginInput = getByPlaceholderText('Username')
        const passwordInput = getByPlaceholderText('Password')
        fireEvent.change(loginInput, { target: { value: 'username' } })
        fireEvent.change(passwordInput, { target: { value: 'pass' } })
        fireEvent.submit(screen.getByTestId('modal-form'))
        await waitFor(() => expect(global.fetch).toBeCalled())
    })

    it('should sign up', async () => {
        const ModalProvider = createModal('signup')
        render(ModalProvider)
        const { getByPlaceholderText, getByLabelText } = screen
        const loginInput = getByPlaceholderText('Username')
        const passwordInput = getByPlaceholderText('Password')
        const sexInput = getByLabelText('Male')
        fireEvent.change(loginInput, { target: { value: 'username' } })
        fireEvent.change(passwordInput, { target: { value: 'pass' } })
        fireEvent.click(sexInput)
        fireEvent.submit(screen.getByTestId('modal-form'))
        await waitFor(() => expect(global.fetch).toBeCalled())
    })
})