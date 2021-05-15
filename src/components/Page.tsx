import React, { FC } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from "./home/Home";
import Chat from "./chat/Chat";
import { AnimatePresence } from "framer-motion"


const Page: FC = () => {
    return (
        <>
            <div className="content">
                <Router>
                    <AnimatePresence>
                        <Switch>
                            <Route path='/' exact component={Home} />
                            <Route path='/chat/:isNew' exact component={Chat} />
                        </Switch>
                    </AnimatePresence>
                </Router>
            </div>
        </>
    );
}

export default Page;