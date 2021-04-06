import { FC } from 'react'
import ReactDOM from 'react-dom'
import Page2 from './components/Page'
import SocketProvider from './components/context/SocketContext';
import './style/index.scss'
// import 'aos/dist/aos.css'

const App: FC = () => {

    return (
        <SocketProvider>
            <Page2/>
        </SocketProvider>
    );
}

ReactDOM.render(<App />, document.getElementById('root'))

module.hot?.accept()
   