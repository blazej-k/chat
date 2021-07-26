import React from 'react';
import { fireEvent, render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react'
import Home from './Home'
import { Provider } from 'react-redux';
import { store } from '../../reducers/store';
import '@testing-library/jest-dom/extend-expect';

let button: HTMLElement

beforeEach(() => {
    const { getByText } = render(<Provider store={store}><Home /></Provider>)
    button = getByText(/sign in/i)
})

describe('Home', () => {
    it('should show home page', async () => {
        const text = screen.getByText('ChatZilla')
        await waitFor(() => expect(text).toBeInTheDocument())
    });
    it('should show sign in modal after click', async () => {
        fireEvent.click(button)
        await waitFor(() => expect(screen.getByTestId('m-sign-in')).toBeVisible())
    })
    it('should hide modal after click', async () => {
        fireEvent.click(button)
        const secondButton = screen.getByText(/cancel/i)
        fireEvent.click(secondButton)
        await waitForElementToBeRemoved(() => screen.queryByTestId('m-sign-in'))
    })
    it('should show info is user want create account', async () => {
        button = screen.getByText(/try on/i)
        fireEvent.mouseOver(button)
        await waitFor(() => {
            expect(screen.getByText(/Are you ready/i)).toBeVisible()
        })
    })
    it('should close sign in modal and show sign up modal', async () => {
        fireEvent.click(button)
        const secondButton = screen.getByText(/Create new acount/i)
        fireEvent.click(secondButton)
        await waitFor(() => {
            expect(screen.getByTestId('m-sign-up')).toBeVisible()
        })
    })
});