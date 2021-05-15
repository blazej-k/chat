import React from 'react';
import { act, fireEvent, render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react'
import Home from './Home'
import { Provider } from 'react-redux';
import { store } from '../../reducers/store';
import '@testing-library/jest-dom/extend-expect';

beforeEach(() => {
    render(<Provider store={store}><Home /></Provider>)
})

describe('Home', () => {
    it('should show home page', async() => {
        const { getByText } = screen;
        await waitFor(() => expect(getByText('ChatZilla')).toBeInTheDocument())
    });
    it('should show sign in modal after click', async() => {
        const { getByText, getByTestId } = screen;
        const button = getByText(/sign in/i)
        fireEvent.click(button)
        await waitFor(() => expect(getByTestId('m-sign-in')).toBeVisible())
    })
    it('should hide modal after click', async() => {
        const { getByText } = screen
        const button = getByText(/sign in/i)
        fireEvent.click(button)
        const secondButton = getByText(/cancel/i)
        fireEvent.click(secondButton)
        await waitForElementToBeRemoved(() => screen.queryByTestId('m-sign-in'))
    })
    it('should show info is user want create account', async () => {
        const { getByText } = screen;
        const button = getByText(/try on/i)
        fireEvent.mouseOver(button)
        await waitFor(() => {
            expect(screen.getByText(/Are you ready/i)).toBeVisible()
        })
    })
    it('should close sign in modal and show sign up modal', async () => {
        const { getByText } = screen;
        const button = getByText(/sign in/i)
        fireEvent.click(button)
        const secondButton = getByText(/Create new acount/i)
        fireEvent.click(secondButton)
        await waitFor(() => {
            expect(screen.getByTestId('m-sign-up')).toBeVisible()
        })
    })
});