import React, { FC, ReactElement } from "react"
import { AnimatePresence } from "framer-motion"
import { render } from "@testing-library/react"
import { Provider } from "react-redux"
import { MemoryRouter, Switch, Route } from "react-router-dom"
import { combineReducers, createStore } from "redux"
import SocketProvider from "../components/context/SocketContext"
import Home from "../components/home/Home"
import { UserReducer } from "../reducers/UserReducer"

const exampelUser: User = {
    login: 'user',
    sex: 'female',
    friends: [],
    groups: [],
    waitingFriends: [],
    waitingGroups: [],
    conversations: []
}

const renderWithRouter = (ui: ReactElement, newUser = false, user = exampelUser) => {
    const rootReducer = combineReducers({
        userReducer: UserReducer,
    })
    const store = createStore(rootReducer, { userReducer: { user, loading: false, error: '' } })

    const Wrapper: FC = ({ children }) => (
        <Provider store={store}>
            <SocketProvider>
                <MemoryRouter initialEntries={[`chat/${newUser}`]}>
                    <Switch>
                        <Route path='chat/:isNew'>
                            <AnimatePresence>
                                {children}
                            </AnimatePresence>
                        </Route>
                        <Route path='/'>
                            <Home />
                        </Route>
                    </Switch>
                </MemoryRouter>
            </SocketProvider>
        </Provider>
    )
    render(ui, { wrapper: Wrapper })
}

export default renderWithRouter