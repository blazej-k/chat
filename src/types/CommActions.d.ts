const CREATEGROUP = 'creategroup'

interface Group {
    name: string,
    groupId: string,
    members: [
        {
            _id: string,
            login: string,
            sex: 'male' | 'female'
        }
    ]
}

interface CreateGroup {
    type: typeof CREATEGROUP,
    payload: Group
}

// interface NewGroup {
//     name: string,
//     id: string,
//     members: [
//         {
//             _id: string,
//             login: string,
//             sex: 'male' | 'female'
//         }
//     ]
// }

interface CommunityReducer {
    community: Community,
    loading: boolean,
    error: string
}

type CommunityActionType = CreateGroup