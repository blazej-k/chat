import React, { FC, MouseEvent } from 'react'
import { MdClear, MdDone } from 'react-icons/md';
import List from './List';
import { NavList } from './Nav';

interface ListsProps {
    values: {
        friends: Friend[],
        groups: Group[],
        waitingGroups: WaitingGroup[],
        waitingFriends: WaitingFriend[],
        listsStatus: NavList<'collection-close', 'collection-open'>,
        handleListStatus: (e: MouseEvent<HTMLSpanElement>) => void,
        showFriendsChat: (friend: string) => void,
        showGroupsChat: (group: string) => void,
        handleNewFriendDecission: (decision: Decission, waiter: string) => void,
        handleNewGroupDecission: (decision: Decission, group: WaitingGroup) => void
    }
}

const Lists: FC<ListsProps> = ({ values }) => {

    const { friends, groups, waitingFriends, waitingGroups, listsStatus, handleListStatus, showFriendsChat,
        showGroupsChat, handleNewFriendDecission, handleNewGroupDecission } = values

    return (
        <>
            <List
                type='friends'
                list={friends}
                listsStatus={listsStatus}
                handleListStatus={handleListStatus}
                elements={friends.map(({ date, login }) => (
                    <li key={date}>
                        <span onClick={() => showFriendsChat(login)}>{login}</span>
                    </li>
                ))}
            />
            <List
                type='groups'
                list={groups}
                listsStatus={listsStatus}
                handleListStatus={handleListStatus}
                elements={groups.map(({ groupId, groupName }) => (
                    <li key={groupId}>
                        <span onClick={() => showGroupsChat(groupName)}>{groupName}</span>
                    </li>
                ))}
            />
            <List
                type='waitingFriends'
                list={waitingFriends}
                listsStatus={listsStatus}
                handleListStatus={handleListStatus}
                elements={waitingFriends.map(({ sender, date }) => (
                    <li key={date}>
                        <span>
                            {sender}
                        </span>
                        <div className="decission">
                            <MdClear onClick={() => handleNewFriendDecission('reject', sender)} className={'red'} size={25} />
                            <MdDone onClick={() => handleNewFriendDecission('accept', sender)} className={'green'} size={25} />
                        </div>
                    </li>
                ))}
            />
            <List
                type='waitingGroups'
                list={waitingGroups}
                listsStatus={listsStatus}
                handleListStatus={handleListStatus}
                elements={waitingGroups.map(group => (
                    <li key={group.date}>
                        <span>
                            {group.groupName}
                        </span>
                        <div className="decission">
                            <MdClear onClick={() => handleNewGroupDecission('reject', group)} className={'red'} size={25} />
                            <MdDone onClick={() => handleNewGroupDecission('accept', group)} className={'green'} size={25} />
                        </div>
                    </li>
                ))}
            />
        </>
    );
}

export default Lists;