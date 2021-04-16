import * as React from 'react';
import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useColor } from '../../../hooks/Hooks';

interface SearchListProps {
    friendName: string
}

const SearchList: FC<SearchListProps> = ({ friendName }) => {

    const [searchedUsers, setSearchedUsers] = useState<CommunityUser[]>([])
    const [firstIndex, setFirstIndex] = useState(0)

    const {color} = useColor()

    const { community: { users } } = useSelector((state: Store) => state.commReducer)

    useEffect(() => {
        users.map(user => {
            if (user.login.toLowerCase().slice(0, friendName.length) === friendName.toLowerCase()) {
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
                            <li key={_id}>{login}</li>
                        ))}
                    </ul>
                    {firstIndex - 4 >= 0 && <button className='red' onClick={() => handleChangeIndex('prev')}>Prev</button>}
                    {searchedUsers.length > firstIndex + 4 &&
                    <button className={color} onClick={() => handleChangeIndex('next')}>Next</button>}
                </> : <span>No users!</span>}
        </div>
    );
}

export default SearchList;