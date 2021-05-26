import { useReducer } from "react"
import { ChatView } from "../../enums/chatView"

interface ChatViewProps {
    home: boolean,
    friends: boolean,
    groups: boolean
}

const chatViewReducer = (state: ChatViewProps, type: ChatView) => {
    switch(type){
        case 'HOME':
            return state = {home: true, friends: false, groups: false}
        case 'FRIENDS':
            return state = {home: false, friends: true, groups: false}
        case 'GROUPS':
            return state = {home: false, friends: false, groups: true}
        default: 
            return state
    }
}

const useShowChatView = (): [ChatViewProps, (type: ChatView) => void] => {
    const [chatView, dispatch] = useReducer(chatViewReducer, {home: true, friends: false, groups: false})

    const changeChatView = (type: ChatView) => dispatch(type)

    return [chatView, changeChatView]
}

export default useShowChatView