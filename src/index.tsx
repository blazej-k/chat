import { FC } from 'react'
import ReactDOM from 'react-dom'
import Page2 from './components/Page2'
import SocketProvider from './components/context/SocketContext';
import './style/index.scss'

const App: FC = () => {

    return (
        <SocketProvider>
            <Page2/>
        </SocketProvider>
    );
}

ReactDOM.render(<App />, document.getElementById('root'))

module.hot?.accept()
   