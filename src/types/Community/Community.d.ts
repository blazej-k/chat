interface Community {
    users: CommunityUser[],
    groups: CommunityGroup[],
}


interface CommunityGroup {
    groupName: string,
    groupId: string,
    _id: string
}

interface CommunityUser {
    login: string,
    sex: Sex,
    _id?: string
}

type Decission = 'accept' | 'reject'

