import React, { FC, useReducer } from 'react'
import { createContext } from 'react'
import { ChatView } from "../../enums/chatView"

interface ChatViewProps {
    showHome: boolean,
    showFriend: boolean,
    showGroup: boolean,
    groupId: string,
    friendName: string
}

interface ChatViewAction {
    type: ChatView,
    name: string
}

interface Context {
    chatView: ChatViewProps,
    changeChatView: (type: ChatView, name?: string) => void
}

const chatViewReducer = (state: ChatViewProps, action: ChatViewAction) => {
    switch (action.type) {
        case ChatView.home:
            return state = { showHome: true, showFriend: false, showGroup: false, friendName: '', groupId: '' }
        case ChatView.friends:
            return state = { showHome: false, showFriend: true, showGroup: false, friendName: action.name, groupId: '' }
        case ChatView.groups:
            return state = { showHome: false, showFriend: false, showGroup: true, friendName: '', groupId: action.name }
        default:
            return state
    }
}

const initChatView: ChatViewProps = {
    showFriend: false,
    showGroup: false,
    showHome: true,
    friendName: '',
    groupId: ''
}
 
const ChatViewProvider: FC = ({children}) => {

    const [chatView, dispatch] = useReducer(chatViewReducer, initChatView)
    const changeChatView = (type: ChatView, name = '') => dispatch({ type, name })

    return (
        <ChatViewContext.Provider value={{chatView, changeChatView}}>
            {children}
        </ChatViewContext.Provider>
    );
}

const ChatViewContext = createContext<Context>({
    chatView: initChatView,
    changeChatView: () => null
})

export {ChatViewContext, ChatViewProvider}