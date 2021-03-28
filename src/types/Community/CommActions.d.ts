const CREATEGROUP = 'creategroup'

interface CreateGroup {
    type: typeof CREATEGROUP,
    payload: CommunityGroup
}

interface CommunityReducer {
    community: Community,
    loading: boolean,
    error: string
}

type CommunityActionType = CreateGroup