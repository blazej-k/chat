import { FC } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from "./home/Home";
import Page from "./Page";
import { AnimatePresence } from "framer-motion"


const Page2: FC = () => {
    return (
        <Router>
            <AnimatePresence>
                <Switch>
                    <Route path='/' exact component={Home} />
                    <Route component={Page} />
                </Switch>
            </AnimatePresence>
        </Router>
    );
}

export default Page2;