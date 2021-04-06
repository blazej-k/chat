interface Community {
    users: {
        login: string,
        date: date,
        sex: Sex,
        _id: string
    }[],
    groups: CommunityGroup[],
}


interface CommunityGroup {
    groupName: string,
    groupId: string,
    _id: string
}

type Decission = 'accept' | 'reject'

