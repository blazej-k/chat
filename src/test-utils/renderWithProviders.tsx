import React, { FC, ReactElement } from "react"
import { AnimatePresence } from "framer-motion"
import { render } from "@testing-library/react"
import { Provider } from "react-redux"
import { MemoryRouter, Switch, Route } from "react-router-dom"
import SocketProvider from "../components/context/socketContext/SocketContext"
import Home from "../components/home/Home"
import {getStore, exampleUser} from "./customStore"

const renderWithRouter = (ui: ReactElement, newUser = false, user = exampleUser) => {

    const store = getStore(user)

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