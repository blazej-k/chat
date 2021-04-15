import {CREATEGROUP, COMMUNITYERROR, GETUSERS} from '../actions/CommunityActions'

const initState: CommunityReducer = {
    community: {
        groups: [],
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
        case GETUSERS:
            return state = {...state, community: {...state.community, users: action.payload}}
        case COMMUNITYERROR:
            return state = {...state, loading: false, error: action.payload}
        default:
            return state
    } 
} 