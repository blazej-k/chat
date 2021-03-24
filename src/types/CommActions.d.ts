const CREATEGROUP = 'creategroup'

interface CreateGroup {
    type: typeof CREATEGROUP,
    payload: Group
}

interface CommunityReducer {
    community: Community,
    loading: boolean,
    error: string
}

type CommunityActionType = CreateGroup