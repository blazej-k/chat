import { FC } from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Home from "./home/Home";
import Page from "./Page";

const Page2: FC = () => {
    return (
        <Router>
            <Switch>
                <Route path='/' exact component={Home}/>
                <Route component={Page}/>
            </Switch>
        </Router>
    );
}
 
export default Page2;