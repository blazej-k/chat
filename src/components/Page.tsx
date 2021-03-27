import { ChangeEvent, FC, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { confirmFriendsInvite, joinToGroup, removeInvite, sendInvite, newGroupMessage as sendNewGroupMessage } from "../actions/UserActions";
import Chat from "./Chat";
import Form from "./Form";
import useSocket from "./hooks/SocketHook";

interface PrivateMess {
    from: string,
    mess: string
}


const Page: FC = () => {

    const [showChat, setShowChat] = useState(false)
    const store = useSelector((store: Store) => store.userReducer)
    const [formType, setFormType] = useState<'signIn' | 'signUp'>('signIn')
    const [friend, setFriend] = useState('')
    const [friends, setFriends] = useState<Friend[]>([])
    const [mess, setMess] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [res, setRes] = useState<PrivateMess[]>([] as PrivateMess[])
    const [friendToGroup, setFriendToGroup] = useState('')
    const [newGroupMessage, setNewGroupMessage] = useState('')
    const [joinedToGroups, setJoinedToGroups] = useState(false)

    const client = useSocket().client

    const dispatch = useDispatch()


    const { user: { waitingFriends, waitingGroups, login, groups, sex }, error, user } = store

    useEffect(() => {
        if (Object.entries(user).length > 0) {
            setShowChat(true)
            errorMessage.length > 0 && setErrorMessage('')
            if (!joinedToGroups) {
                for (const group in user.groups) {
                    const { groupId } = user.groups[group]
                    client.emit('join to group', groupId)
                    setJoinedToGroups(true)
                }
            }
        }
        else if (error.length > 0) {
            setErrorMessage(error)
            showChat && setShowChat(false)
        }
        if (user.friends !== friends) {
            setFriends(user.friends)
        }
    }, [user])


    useEffect(() => {
        client.on('private message', (res: { from: string, mess: string }) => {
            setRes(prev => [...prev, res])
        })
        client.on('group message', (res: { text: string, date: any, sender: string }, groupId: string) => {
            const { text, sender } = res
            dispatch(sendNewGroupMessage(groupId, text, sender))
        })
    }, [])

    const handleInviteFriendToGroup = (groupName: string, groupId: string, members: GroupMembers[]) => {
        const infoObj = {
            groupName,
            groupId,
            sender: login,
            recipient: friendToGroup,
            members
        }
        dispatch(sendInvite('group', infoObj))
    }

    const handleIVTGInput = (e: ChangeEvent<HTMLInputElement>) => {
        setFriendToGroup(e.currentTarget.value)
    }

    const handleMessInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setMess(e.currentTarget.value)
    }

    const handleSendButton = (to: string) => {
        client.emit('send private message', { name: login, to, mess })
    }

    const handleGroupMessageInput = (e: ChangeEvent<HTMLInputElement>) => {
        setNewGroupMessage(e.currentTarget.value)
    }

    const handleSendGroupMessageButton = (groupId: string) => {
        client.emit('send group message', groupId, newGroupMessage, login)
        dispatch(sendNewGroupMessage(groupId, newGroupMessage, login))
    }

    const handleButton = () => {
        const invite: FriendInfo = {
            sender: login,
            recipient: friend
        }
        dispatch(sendInvite('friend', invite))
    }

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setFriend(e.currentTarget.value)
    }

    const handleGroupButton = (group: GroupInfo, decision: 'accept' | 'reject') => {
        const { groupId, groupName, members } = group
        const newGroup: Group = {
            groupId,
            groupName,
            members: [...members],
            dialogues: []
        }
        dispatch(removeInvite(group.groupId, 'group'))
        dispatch(joinToGroup(newGroup, login, sex, decision))
    }

    const handleFriendButton = (waiter: string, decision: 'accept' | 'reject') => {

        const confirm: ConfirmFriend = {
            waiter,
            recipient: login,
            decision
        }
        dispatch(removeInvite(waiter, 'friend'))
        dispatch(confirmFriendsInvite(confirm))
    }

    return (
        <div className="page">
            <h2>CHAT</h2>
            <button onClick={() => setFormType('signIn')}>SignIn</button>
            <button onClick={() => setFormType('signUp')}>SignUp</button>
            <Form formType={formType} />
            {errorMessage.length > 0 && <h1>{errorMessage}</h1>}
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
                        {waitingFriends.map(invite => (
                            <li key={invite._id as string}>
                                <h2>{invite.sender}</h2><br />
                                {invite.date}
                                <button onClick={() => handleFriendButton(invite.sender, 'accept')}>OK</button>
                                <button onClick={() => handleFriendButton(invite.sender, 'reject')}>NO</button>
                            </li>
                        ))}
                    </ul>
                </>}
                {waitingGroups && waitingGroups.length > 0 && <>
                    <h1>Do you know them?</h1>
                    <ul>
                        {waitingGroups.map(group => (
                            <li key={group._id as string}>
                                <h2>{group.groupName}</h2><br />
                                {group.date}
                                <button onClick={() => handleGroupButton(group, 'accept')}>OK</button>
                                <button onClick={() => handleGroupButton(group, 'reject')}>NO</button>
                            </li>
                        ))}
                    </ul>
                </>}
                {friends && friends.length > 0 ? <><h1>Friends: </h1>
                    <ul>
                        {friends.map(friend => (
                            <li key={friend.date}>
                                {friend.login}
                                <input type="text" value={mess} onChange={handleMessInputChange} />
                                <button onClick={() => handleSendButton(friend.login)}>Send mess</button>
                            </li>
                        ))}
                    </ul>
                </> : <h1>You haven't friends looser</h1>}
                {groups && groups.length > 0 && <>
                    <h1>Your groups</h1>
                    <ul>
                        {groups.map(group => (
                            <li key={group.groupId}>
                                <h2>{group.groupName}</h2><br />
                                <h3>Members: </h3>
                                <ul>
                                    {group.members.map(member => (
                                        <li key={member._id}>{member.login}</li>
                                    ))}
                                </ul>
                                <input type="text" value={friendToGroup} onChange={handleIVTGInput} placeholder='invite friend...' />
                                <button onClick={() => handleInviteFriendToGroup(group.groupName, group.groupId, group.members)}>Send invite</button>
                                <h3>Messages: </h3>
                                {group.dialogues.length > 0 && 
                                    <ul>
                                        {group.dialogues.map(group => (
                                            <li key={group.date}>{group.login} - {group.text}</li>
                                        ))}
                                    </ul>
                                }
                                <input type="text" placeholder='message...' value={newGroupMessage} onChange={handleGroupMessageInput} />
                                <button onClick={() => handleSendGroupMessageButton(group.groupId)}>Send</button>
                            </li>
                        ))}
                    </ul>
                </>}
            </>}
        </div>
    );
}

export default Page;