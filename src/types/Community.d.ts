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

interface Friend {
    login: string,
    date: date,
    sex: 'male' | 'female',
}
