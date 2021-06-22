import React from 'react'
import { screen, waitFor } from '@testing-library/react'
import Chat from './Chat'
import renderWithRouter from 'test-utils/renderWithProviders' 

describe('Chat', () => {
    it('should render component', async() => {
        renderWithRouter(<Chat />)
        await waitFor(() => expect(screen.getByText(/welcome back, user/i)).toBeTruthy())
    })

    it('should render greeting modal when user sign up', () => {
        renderWithRouter(<Chat />, true)
        expect(screen.getByTestId('greeting-modal')).toBeTruthy()
    })

    it('should redirect to home when login is undefined', async () => {
        renderWithRouter(<Chat />, false, {} as User)
        await waitFor(() => {
            expect(screen.getByText('ChatZilla')).toBeTruthy()
        })
    })
})