const CREATEGROUP = 'creategroup'
const COMMUNITYERROR = 'communityerror'

interface CreateGroup {
    type: typeof CREATEGROUP,
    payload: CommunityGroup
}

interface CommunityError {
    type: typeof COMMUNITYERROR,
    payload: string
}

interface CommunityReducer {
    community: Community,
    loading: boolean,
    error: string
}

type CommunityActionType = CreateGroup | CommunityError