import * as React from 'react';
import { MouseEvent } from 'react'
import { FC } from 'react';
import { RiArrowRightSLine } from 'react-icons/ri';
import { NavListProps } from './Nav';

interface ListProps {
    type: 'friends' | 'groups' | 'waitingFriends' | 'waitingGroups',
    list: Friend[] | Group[] | WaitingFriend[] | WaitingGroup[]
    listsStatus: NavListProps<'collection-close', 'collection-open'>
    elements: JSX.Element[],
    handleListStatus: (e: MouseEvent<HTMLSpanElement>) => void
}

const List: FC<ListProps> = ({ type, list, listsStatus, elements, handleListStatus }) => {

    const getListName = (type: 'friends' | 'groups' | 'waitingFriends' | 'waitingGroups') => {
        if(type[0] === 'w') return `${type[0].toUpperCase()}${type.slice(1, 7)} ${type.slice(7)}`
        return `${type[0].toUpperCase()}${type.slice(1)}`
    }

    return (
        <li className={listsStatus[type]} id={type}>
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
                    {elements}
                </ul>
            }
        </li>
    );
}

export default List;