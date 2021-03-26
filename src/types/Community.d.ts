interface Community {
    users: {
        login: string,
        date: date,
        sex: string,
        _id: string
    }[],
    groups: Group[],
}


interface Group {
    groupName: string,
    groupId: string,
    members: GroupMembers[],
    _id?: string
}

interface GroupMembers {
    _id: string,
    login: string,
    sex: 'male' | 'female'
}

interface Friend {
    login: string,
    date: date,
    sex: 'male' | 'female',
}
