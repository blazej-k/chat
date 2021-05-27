import { useReducer } from "react"
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

const chatViewReducer = (state: ChatViewProps, action: ChatViewAction) => {
    switch (action.type) {
        case 'HOME':
            return state = { showHome: true, showFriend: false, showGroup: false, friendName: '', groupId: '' }
        case 'FRIENDS':
            return state = { showHome: false, showFriend: true, showGroup: false, friendName: action.name, groupId: '' }
        case 'GROUPS':
            return state = { showHome: false, showFriend: false, showGroup: true, friendName: '', groupId: action.name }
        default:
            return state
    }
}

const useShowChatView = (): [ChatViewProps, (type: ChatView, name?: string) => void] => {
    const initChatView: ChatViewProps = {
        showFriend: false,
        showGroup: false,
        showHome: true,
        friendName: '',
        groupId: ''
    }
    const [chatView, dispatch] = useReducer(chatViewReducer, initChatView)
    const changeChatView = (type: ChatView, name = '') => dispatch({ type, name })

    return [chatView, changeChatView]
}

export default useShowChatView