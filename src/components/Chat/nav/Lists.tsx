import React, { FC, memo, MouseEvent } from 'react'
import { MdClear, MdDone } from 'react-icons/md';
import { shallowEqual, useSelector } from 'react-redux';
import { ChatView } from '../../../enums/chatView';
import List from './List';
import ListsWrapper from './ListsWrapper';
import { NavList } from './Nav';

interface ListsProps {
    listsStatus: NavList<'collection-close', 'collection-open'>,
    handleListStatus: (e: MouseEvent<HTMLSpanElement>) => void
    changeChatView: (type: ChatView, name: string) => void
    handleNewFriendDecission: (decision: Decission, waiter: string) => void,
    handleNewGroupDecission: (decision: Decission, group: WaitingGroup) => void
}

const Lists: FC<ListsProps> = ({ listsStatus, handleListStatus, changeChatView, handleNewFriendDecission, handleNewGroupDecission }) => {

    const { friends, groups, waitingFriends, waitingGroups } = useSelector((store: Store) => store.userReducer.user, shallowEqual)

    return (
        <ListsWrapper listsStatus={listsStatus} handleListStatus={handleListStatus}>
            <List type='friends' list={friends}>
                {friends.map(({ date, login }) => (
                    <li key={date}>
                        <span onClick={() => changeChatView(ChatView.friends, login)}>{login}</span>
                    </li>
                ))}
            </List>
            <List type='groups' list={groups}>
                {groups.map(({ groupId, groupName }) => (
                    <li key={groupId}>
                        <span onClick={() => changeChatView(ChatView.groups, groupId)}>{groupName}</span>
                    </li>
                ))}
            </List>
            <List type='waitingFriends' list={waitingFriends}>
                {waitingFriends.map(({ sender, date }) => (
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
            </List>
            <List type='waitingGroups' list={waitingGroups}>
                {waitingGroups.map(group => (
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
            </List>
        </ListsWrapper>
    );
}

export default memo(Lists);