import { ChangeEvent, FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Chat from "./Chat";
import Form from "./Form";
import useSocket from "./hooks/SocketHook";

interface Invite {
    from: string,
    to: string,
}

interface PrivateMess {
    from: string,
    mess: string
}

const Page: FC = () => {

    const [showChat, setShowChat] = useState(false)
    const [nameOfUser, setNameOfuser] = useState('')
    const store = useSelector((store: Store) => store.userReducer)
    const [formType, setFormType] = useState<'signIn' | 'signUp'>('signIn')
    const [friend, setFriend] = useState('')
    const [mess, setMess] = useState('')
    const [res, setRes] = useState<PrivateMess[]>([] as PrivateMess[])
    const client = useSocket().client

    const { user: { waitingFriends, login, friends } } = store

    useEffect(() => {
        const { login } = store.user
        if (nameOfUser !== login) {
            setNameOfuser(login)
        }
    }, [store])

    useEffect(() => {
        client.on('private message', (res: { from: string, mess: string }) => {
            setRes(prev => [...prev, res])
        })
    }, [])

    const handleMessInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setMess(e.currentTarget.value)
    }

    const handleSendButton = (to: string) => {
        client.emit('send private message', { name: login, to, mess })
    }

    const handleButton = () => {
        const invite: Invite = {
            from: store.user.login,
            to: friend
        }
        if (friend.length > 0) {
            fetch('http://localhost:1000/inviteFriend', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(invite),
            })
        }
    }

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setFriend(e.currentTarget.value)
    }

    const handleFriendButton = (waiter: string, decision: 'accept' | 'reject') => {

        const decisionObj = {
            waiter,
            decision,
            recipient: login
        }

        fetch('http://localhost:1000/confirmFriend', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(decisionObj),
        })
    }

    return (
        <div className="page">
            <h2>CHAT</h2>
            <button onClick={() => setFormType('signIn')}>SignIn</button>
            <button onClick={() => setFormType('signUp')}>SignUp</button>
            <Form showChat={setShowChat} formType={formType} />
            {showChat && <>
                {res.length > 0 && res.map(obj => (
                    <h1 key={obj.mess}>{obj.mess}</h1>
                ))}
                <Chat />
                <input type="text" value={friend} placeholder='add friend' onChange={handleInput} />
                <button onClick={handleButton}>Send</button>
                {waitingFriends && waitingFriends.length > 0 && <>
                    <h1>Do you know them?</h1>
                    <ul>
                        {waitingFriends.map(friend => (
                            <li key={friend._id as string}>
                                <h2>{friend.name}</h2><br />
                                {friend.date}
                                <button onClick={() => handleFriendButton(friend.name, 'accept')}>OK</button>
                                <button onClick={() => handleFriendButton(friend.name, 'reject')}>NO</button>
                            </li>
                        ))}
                    </ul>
                </>}
                {friends && friends.length > 0 ? <><h1>Friends: </h1>
                    <ul>
                        {friends.map(friend => (
                            <li key={friend._id}>
                                {friend.name}
                                <input type="text" value={mess} onChange={handleMessInputChange} />
                                <button onClick={() => handleSendButton(friend.name)}>Send mess</button>
                            </li>
                        ))}
                    </ul>
                </> : <h1>You haven't friends looser</h1>}
            </>}
        </div>
    );
}

export default Page;