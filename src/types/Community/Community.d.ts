interface Community {
    users: {
        login: string,
        date: date,
        sex: string,
        _id: string
    }[],
    groups: CommunityGroup[],
}


interface CommunityGroup {
    groupName: string,
    groupId: string,
    _id: string
}

