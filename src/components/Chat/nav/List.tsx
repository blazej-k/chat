import React, { FC, MouseEvent } from 'react';
import { RiArrowRightSLine } from 'react-icons/ri';
import { NavList } from './Nav';

interface ListProps {
    type: 'friends' | 'groups' | 'waitingFriends' | 'waitingGroups',
    list: Friend[] | Group[] | WaitingFriend[] | WaitingGroup[]
    listsStatus?: NavList<'collection-close', 'collection-open'>
    handleListStatus?: (e: MouseEvent<HTMLSpanElement>) => void
}

const getListName = (type: 'friends' | 'groups' | 'waitingFriends' | 'waitingGroups') => {
    if (type[0] === 'w') return `${type[0].toUpperCase()}${type.slice(1, 7)} ${type.slice(7)}`
    return `${type[0].toUpperCase()}${type.slice(1)}`
}

const List: FC<ListProps> = ({ type, list, listsStatus, children, handleListStatus }) => {

    if (listsStatus && handleListStatus) {
        return (
            <li className={list.length === 0 ? 'collection-close' : listsStatus[type]} id={type}>
                {list.length > 0 ?
                    <>
                        <span onClick={(e) => handleListStatus(e)}>{getListName(type)}</span>
                        <RiArrowRightSLine />
                    </> :
                    <>
                        <span className='empty-list'>{getListName(type)}</span>
                        <RiArrowRightSLine className='empty-list' />
                    </>
                }
                {list.length > 0 && listsStatus[type] === 'collection-open' &&
                    <ul>
                        {children}
                    </ul>
                }
            </li>
        );
    }
    else return null
}

export default List;