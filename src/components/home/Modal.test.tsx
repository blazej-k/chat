import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';
import renderModal from 'test-utils/renderModal';

let unmountImplementation: () => void;
let loginInput: HTMLElement, passwordInput: HTMLElement;

beforeEach(() => {
    global.fetch = jest.fn(() => Promise.resolve({
        json: () => Promise.resolve({}),
    } as Response))
    const { unmount, getByPlaceholderText } = renderModal()
    unmountImplementation = unmount;
    loginInput = getByPlaceholderText('Username')
    passwordInput = getByPlaceholderText('Password')
})
afterEach(() => jest.clearAllMocks())

describe('Modal', () => {
    it('should prevent sending data if username is empty', async () => {
        fireEvent.change(passwordInput, { target: { value: 'pass' } })
        fireEvent.submit(screen.getByTestId('modal-form'))
        await waitFor(() => expect(global.fetch).not.toBeCalled())
    })

    it('should prevent sending data if password is empty', async () => {
        fireEvent.change(loginInput, { target: { value: 'username' } })
        fireEvent.submit(screen.getByTestId('modal-form'))
        await waitFor(() => expect(global.fetch).not.toBeCalled())
    })

    it('should prevent sending data if sex is empty', async () => {
        unmountImplementation()
        const { getByPlaceholderText } = renderModal('signup')
        const login = getByPlaceholderText('Username')
        const password = getByPlaceholderText('Password')
        fireEvent.change(login, { target: { value: 'username' } })
        fireEvent.change(password, { target: { value: 'pass' } })
        fireEvent.submit(screen.getByTestId('modal-form'))
        await waitFor(() => expect(global.fetch).not.toBeCalled())
    })

    it('should sign in', async () => {
        fireEvent.change(loginInput, { target: { value: 'username' } })
        fireEvent.change(passwordInput, { target: { value: 'pass' } })
        fireEvent.submit(screen.getByTestId('modal-form'))
        await waitFor(() => expect(global.fetch).toBeCalled())
    })

    it('should sign up', async () => {
        unmountImplementation()
        const { getByPlaceholderText, getByLabelText } = renderModal('signup')
        const login = getByPlaceholderText('Username')
        const password = getByPlaceholderText('Password')
        const sex = getByLabelText('Male')
        fireEvent.change(login, { target: { value: 'username' } })
        fireEvent.change(password, { target: { value: 'pass' } })
        fireEvent.click(sex)
        fireEvent.submit(screen.getByTestId('modal-form'))
        await waitFor(() => expect(global.fetch).toBeCalled())
    })
})