import {CREATEGROUP} from '../actions/CommunityActions'

const initState: CommunityReducer = {
    community: {
        groups: [] as Group[],
        users: []
    } ,
    loading: false,
    error: ''
}

export const CommunityReducer = (state = initState, action: CommunityActionType) => {
    switch (action.type) {
        case CREATEGROUP:
            const { community } = state
            state = { loading: false, error: '', community: { ...community, groups: [...community.groups, action.payload] } }
            return state
        default:
            return state
    }
} 