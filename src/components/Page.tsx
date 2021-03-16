import { ChangeEvent, FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Chat from "./Chat";
import Form from "./Form";
import useSocket from "./hooks/SocketHook";

interface Invite {
    from: string,
    to: string,
}

const Page: FC = () => {

    const [showChat, setShowChat] = useState(false)
    const [nameOfUser, setNameOfuser] = useState('')
    const client = useSocket().client
    const store = useSelector((store: Store) => store.userReducer)
    const [formType, setFormType] = useState<'signIn' | 'signUp'>('signIn')
    const [friend, setFriend] = useState('')

    const { user: { waitingFriends, login, friends } } = store

    useEffect(() => {
        return () => {
            client.disconnect()
        }
    }, [])

    useEffect(() => {
        const { login } = store.user
        if (nameOfUser !== login) {
            setNameOfuser(login)
        }
    }, [store])

    const handleButton = () => {
        console.log(friend)
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
                            </li>
                        ))}
                    </ul>
                </> : <h1>You haven't friends looser</h1>}
            </>}
        </div>
    );
}

export default Page;