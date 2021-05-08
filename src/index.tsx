import React, { FC } from 'react'
import ReactDOM from 'react-dom'
import Page from './components/Page'
import SocketProvider from './components/context/SocketContext';
import MetaTags from 'react-meta-tags';
import './style/index.scss'
import { Provider } from 'react-redux';
import { store } from './reducers/store';

const App: FC = () => {

    return (
        <SocketProvider>
            <MetaTags>
                <title>ChatZilla</title>
                <meta
                    name='description' 
                    content="Everyone can use this page to write with friends and groups! You have to only register. That's all!" />
                <meta name='keywords' content='chat, friends, groups, communication, community, chatzilla' />
                <meta name='viewport' content='width=device-width, initial-scale=1.0'/>
                <meta name='author' content='Błazej Kania'/>
                <meta charSet='UTF-8'/>
            </MetaTags>
            <Provider store={store}>
                <Page/>
            </Provider>
        </SocketProvider>
    );
}

ReactDOM.render(<App />, document.getElementById('root'))

module.hot?.accept()
   