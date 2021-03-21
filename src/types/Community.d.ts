interface Community {
    users: {
        login: string,
        date: date,
        sex: string,
        _id: string
    }[], 
    groups: Group[],
}