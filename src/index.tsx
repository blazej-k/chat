import { FC, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import Form from './components/Form'
import Chat from './components/Chat'


const App: FC = () => {
    const [showChat, setShowChat] = useState(false)
    const [name, setName] = useState('')

    return (
        <div className="page">
             <h2>CHAT</h2>
             <Form setShowChat={setShowChat} setName={setName}/>
             {showChat && <Chat name={name}/>}
        </div>
    );
}
 
ReactDOM.render(<App/>, document.getElementById('root'))
