import React, { FC } from 'react'
import ReactDOM from 'react-dom'
import Page from './components/Page'
import SocketProvider from './components/context/SocketContext';
import './style/index.scss'
import { Provider } from 'react-redux';
import { store } from './reducers/store';

const App: FC = () => {

    return (
        <SocketProvider>
            <Provider store={store}>
                <Page/>
            </Provider>
        </SocketProvider>
    );
}

ReactDOM.render(<App />, document.getElementById('root'))

module.hot?.accept()
   