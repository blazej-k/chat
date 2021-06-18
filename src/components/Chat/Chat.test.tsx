import React, { ReactElement } from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import Chat from './Chat'
import SocketProvider from '../context/SocketContext'
import { Provider } from 'react-redux'
import { MemoryRouter, Route, Switch } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { UserReducer } from '../../reducers/UserReducer'
import { combineReducers, createStore } from 'redux'
import Home from '../home/Home'

const exampelUser: User = {
    login: 'user',
    sex: 'female',
    friends: [],
    groups: [],
    waitingFriends: [],
    waitingGroups: [],
    conversations: []
}

const renderWithRouter = (children: ReactElement, newUser: boolean = false, user = exampelUser) => {
    const rootReducer = combineReducers({
        userReducer: UserReducer,
    })
    const store = createStore(rootReducer, { userReducer: { user, loading: false, error: '' } })
    render(
        <Provider store={store}>
            <SocketProvider>
                <MemoryRouter initialEntries={[`chat/${newUser}`]}>
                    <Switch>
                        <Route path='chat/:isNew'>
                            {children}
                        </Route>
                        <Route path='/'>
                            <Home />
                        </Route>
                    </Switch>
                </MemoryRouter>
            </SocketProvider>
        </Provider>
    )
}

beforeEach(() => {
    renderWithRouter(
        <AnimatePresence>
            <Chat />
        </AnimatePresence>
    )
})

describe('Chat', () => {
    it('should render component', async() => {
        await waitFor(() => expect(screen.getByText(/welcome back, user/i)).toBeTruthy())
    })

    it('should render show greeting modal when user sign up', () => {
        renderWithRouter(
            <AnimatePresence>
                <Chat />
            </AnimatePresence>
            , true)
        expect(screen.getByTestId('greeting-modal')).toBeTruthy()
    })

    it('should redirect to home when login is undefined', async () => {
        renderWithRouter(
            <AnimatePresence>
                <Chat />
            </AnimatePresence>
            , false, {} as User)
        await waitFor(() => {
            expect(screen.getByText('ChatZilla')).toBeTruthy()
        })
    })
})