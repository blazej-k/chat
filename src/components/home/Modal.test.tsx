import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';
import renderModal from 'test-utils/renderModal';

beforeEach(() => {
    global.fetch = jest.fn(() => Promise.resolve({
        json: () => Promise.resolve({}),
    } as Response))
})

afterEach(() => jest.clearAllMocks())

describe('Modal', () => {
    it('should prevent sending data if username is empty', async() => {
        const { getByPlaceholderText } = renderModal()
        const passwordInput = getByPlaceholderText('Password')
        fireEvent.change(passwordInput, { target: { value: 'pass' } })
        fireEvent.submit(screen.getByTestId('modal-form'))
        await waitFor(() => expect(global.fetch).not.toBeCalled())
    })

    it('should prevent sending data if password is empty', async() => {
        const { getByPlaceholderText } = renderModal()
        const loginInput = getByPlaceholderText('Username')
        fireEvent.change(loginInput, { target: { value: 'username' } })
        fireEvent.submit(screen.getByTestId('modal-form'))
        await waitFor(() => expect(global.fetch).not.toBeCalled())
    })

    it('should prevent sending data if sex is empty', async() => {
        renderModal()
        const { getByPlaceholderText } = screen
        const loginInput = getByPlaceholderText('Username')
        const passwordInput = getByPlaceholderText('Password')
        fireEvent.change(loginInput, { target: { value: 'username' } })
        fireEvent.change(passwordInput, { target: { value: 'pass' } })
        fireEvent.submit(screen.getByTestId('modal-form'))
        await waitFor(() => expect(global.fetch).not.toBeCalled())
    })

    it('should sign in', async () => {
        const { getByPlaceholderText } = renderModal()
        const loginInput = getByPlaceholderText('Username')
        const passwordInput = getByPlaceholderText('Password')
        fireEvent.change(loginInput, { target: { value: 'username' } })
        fireEvent.change(passwordInput, { target: { value: 'pass' } })
        fireEvent.submit(screen.getByTestId('modal-form'))
        await waitFor(() => expect(global.fetch).toBeCalled())
    })

    it('should sign up', async () => {
        const { getByPlaceholderText, getByLabelText } = renderModal('signup')
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