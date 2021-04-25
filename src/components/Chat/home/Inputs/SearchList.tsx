import * as React from 'react';
import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useColor } from '../../../hooks/Hooks';
import { MdNavigateNext } from 'react-icons/md'

interface SearchListProps {
    friendName: string,
    handleSelectFriend: (recipient: string) => void
}

const SearchList: FC<SearchListProps> = ({ friendName, handleSelectFriend }) => {

    const [searchedUsers, setSearchedUsers] = useState<CommunityUser[]>([])
    const [firstIndex, setFirstIndex] = useState(0)

    const { mainColor } = useColor()

    const { commReducer: { community: { users } }, userReducer: { user: { login, friends } } } = useSelector((state: Store) => state)

    useEffect(() => {
        const friendsLogins = friends.map(friend => friend.login)
        console.log(users)
        users.map(user => {
            if (user.login.toLowerCase().slice(0, friendName.length) === friendName.toLowerCase() && 
            login !== user.login && !friendsLogins.includes(user.login)) {
                setSearchedUsers(prev => [...prev, user])
            }
        })
        return () => {
            setSearchedUsers([])
            setFirstIndex(0)
        }
    }, [friendName])

    const handleChangeIndex = (type: 'next' | 'prev') => {
        type === 'next' ? setFirstIndex(prev => prev + 4) : setFirstIndex(prev => prev - 4)
    }

    return (
        <div className="search-list">
            {searchedUsers.length > 0 ?
                <>
                    <ul>
                        {searchedUsers.slice(firstIndex, firstIndex + 4).map(({ _id, login }) => (
                            <li onClick={() => handleSelectFriend(login)} key={_id}>{login}</li>
                        ))}
                    </ul>
                    {firstIndex - 4 >= 0 && 
                        <button 
                            className={`prev ${mainColor}`} 
                            onClick={() => handleChangeIndex('prev')}>
                                <MdNavigateNext size={40}/>
                        </button>
                    }
                    {searchedUsers.length > firstIndex + 4 &&
                        <button 
                            className={`next ${mainColor}`} 
                            onClick={() => handleChangeIndex('next')}>
                                <MdNavigateNext  size={40}/>
                        </button>
                    }
                </> : <span>No users!</span>}
        </div>
    );
}

export default SearchList;