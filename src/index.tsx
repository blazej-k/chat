import { FC } from 'react'
import ReactDOM from 'react-dom'
import Page from './components/Page'
import SocketProvider from './components/context/SocketContext';
import './style/index.scss'
// import 'aos/dist/aos.css'

const App: FC = () => {

    return (
        <SocketProvider>
            <Page/>
        </SocketProvider>
    );
}

ReactDOM.render(<App />, document.getElementById('root'))

module.hot?.accept()
   