import React from 'react';
import { fireEvent, render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react'
import Home from './Home'
import { Provider } from 'react-redux';
import { store } from '../../reducers/store';
import '@testing-library/jest-dom/extend-expect';

const HomeProvider = <Provider store={store}><Home /></Provider>

describe('Home', () => {
    it('should show home page', () => {
        const { getByText } = render(HomeProvider);
        expect(getByText('ChatZilla')).toBeInTheDocument()
    });
    it('should show sign in modal after click', () => {
        const { getByText } = render(HomeProvider);
        const button = getByText(/sign in/i)
        fireEvent.click(button)
        expect(screen.getByTestId('m-sign-in')).toBeVisible()
    })
    it('should hide modal after click', async() => {
        render(HomeProvider);
        const { getByText } = screen
        const button = getByText(/sign in/i)
        fireEvent.click(button)
        const secondButton = getByText(/cancel/i)
        fireEvent.click(secondButton)
        await waitForElementToBeRemoved(() => screen.queryByTestId('m-sign-in'))
    })
    it('should show info is user want create account', async () => {
        const { getByText } = render(HomeProvider);
        const button = getByText(/try on/i)
        fireEvent.mouseOver(button)
        await waitFor(() => {
            expect(screen.getByText(/Are you ready/i)).toBeVisible()
        })
    })
    it('should close sign in modal and show sign up modal', async () => {
        const { getByText } = render(HomeProvider);
        const button = getByText(/sign in/i)
        fireEvent.click(button)
        const secondButton = getByText(/Create new acount/i)
        fireEvent.click(secondButton)
        await waitFor(() => {
            expect(screen.getByTestId('m-sign-up')).toBeVisible()
        })
    })
});