const CREATEGROUP = 'creategroup'
const COMMUNITYERROR = 'communityerror'
const GETUSERS = 'getusers'

interface CreateGroup {
    type: typeof CREATEGROUP,
    payload: CommunityGroup
}

interface GetUsers {
    type: typeof GETUSERS,
    payload: CommunityUser[]
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

type CommunityActionType = CreateGroup | GetUsers | CommunityError