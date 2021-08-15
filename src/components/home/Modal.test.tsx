import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react'
import fetch from 'node-fetch'
import renderModal from 'test-utils/renderModal';
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { exampleUser } from '../../test-utils/customStore';
import '@testing-library/jest-dom/extend-expect';
import { ModalTypeEnum } from '../../enums/modalType';

let unmountImplementation: () => void;
let loginInput: HTMLElement, passwordInput: HTMLElement;

const server = setupServer(
    rest.post(process.env.SIGN_IN || '', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({ exampleUser })
        )
    })
)

const spy = jest.spyOn(fetch, 'isRedirect')

beforeAll(() => {
    server.listen()
})
afterAll(() => {
    server.close()
})

beforeEach(() => {
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
        await waitFor(() => expect(spy).not.toBeCalled())
    })

    it('should prevent sending data if password is empty', async () => {
        fireEvent.change(loginInput, { target: { value: 'username' } })
        fireEvent.submit(screen.getByTestId('modal-form'))
        await waitFor(() => expect(spy).not.toBeCalled())
    })

    it('should prevent sending data if sex is empty', async () => {
        unmountImplementation()
        const { getByPlaceholderText } = renderModal('signup')
        const login = getByPlaceholderText('Username')
        const password = getByPlaceholderText('Password')
        fireEvent.change(login, { target: { value: 'username' } })
        fireEvent.change(password, { target: { value: 'pass' } })
        fireEvent.submit(screen.getByTestId('modal-form'))
        await waitFor(() => expect(spy).not.toBeCalled())
    })

    it('should show loader when every input is ok', async () => {
        fireEvent.change(loginInput, { target: { value: 'username' } })
        fireEvent.change(passwordInput, { target: { value: 'pass' } })
        fireEvent.submit(screen.getByTestId('modal-form'))
        await waitFor(() => expect(screen.getByTestId('loader')).toBeInTheDocument())
    })

    it('should sign in', async () => {
        fireEvent.change(loginInput, { target: { value: 'username' } })
        fireEvent.change(passwordInput, { target: { value: 'pass' } })
        fireEvent.submit(screen.getByTestId('modal-form'))
        await waitFor(() => expect(spy).toBeCalled())
    })

    it('should sign up', async () => {
        server.resetHandlers()
        server.use(
            rest.post(process.env.SIGN_UP || '', (req, res, ctx) => {
                return res(
                    ctx.status(200),
                    ctx.json({ exampleUser })
                )
            })
        )
        unmountImplementation()
        const { getByPlaceholderText, getByLabelText } = renderModal(ModalTypeEnum.signup)
        const login = getByPlaceholderText('Username')
        const password = getByPlaceholderText('Password')
        const sex = getByLabelText('Male')
        fireEvent.change(login, { target: { value: 'username' } })
        fireEvent.change(password, { target: { value: 'pass' } })
        fireEvent.click(sex)
        fireEvent.submit(screen.getByTestId('modal-form'))
        await waitFor(() => expect(spy).toBeCalled())
    })
})