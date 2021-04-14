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

    return (
        <li className={listsStatus[type]} id={type}>
            {list.length > 0 ?
                <>
                    <span onClick={(e) => handleListStatus(e)}>{type[0].toUpperCase()}{type.slice(1)}</span>
                    <RiArrowRightSLine />
                </> :
                <>
                    <span className='empty-list'>{type[0].toUpperCase()}{type.slice(1)}</span>
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