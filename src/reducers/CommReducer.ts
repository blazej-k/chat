import { useSelector } from "react-redux"
import useSocket from "../components/hooks/SocketHook"

const initState: CommunityReducer = {
    community: {} as Community,
    loading: false,
    error: ''
}

const client = useSocket().client
const login = useSelector((store: Store) => store.userReducer).user.login

export const CommunityReducer = (state = initState, action: CommunityActionType) => {
    switch (action.type) {
        case CREATEGROUP:
            const { community } = state

            state = { loading: false, error: '', community: { ...community, groups: [...community.groups, action.payload] } }

            const { community: { groups } } = state
            const groupId = groups[groups.length - 1].id
            const groupName = groups[groups.length - 1].name

            client.emit('join to group', login, groupId, groupName)

            return state
        default:
            return state
    }
}