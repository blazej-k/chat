import { FC } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from "./home/Home";
import Page from "./Page";
import Footer from "./footer/Footer";
import { AnimatePresence } from "framer-motion"


const Page2: FC = () => {
    return (
        <>
            <div className="content">
                <Router>
                    <AnimatePresence>
                        <Switch>
                            <Route path='/' exact component={Home} />
                            <Route component={Page} />
                        </Switch>
                    </AnimatePresence>
                </Router>
            </div>
            <Footer />
        </>
    );
}

export default Page2;