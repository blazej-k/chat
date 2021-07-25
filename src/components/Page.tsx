import React, { FC, lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AnimatePresence } from "framer-motion"
import { ChatViewProvider } from "./context/ChatViewContext";
const Home = lazy(() => import('./home/Home'))
const Chat = lazy(() => import('./chat/Chat'))

const LazyHome: FC = () => (
    <Suspense fallback={<div>Loading..</div>}>
        <Home />
    </Suspense>
)

const LazyChat: FC = () => (
    <Suspense fallback={<div>Loading..</div>}>
        <ChatViewProvider>
            <Chat />
        </ChatViewProvider>
    </Suspense>
)

const Page: FC = () => {
    return (
        <>
            <div className="content">
                <Router>
                    <AnimatePresence>
                        <Switch>
                            <Route path='/' exact component={LazyHome} />
                            <Route path='/chat/:isNew' exact component={LazyChat} />
                        </Switch>
                    </AnimatePresence>
                </Router>
            </div>
        </>
    );
}

export default Page;