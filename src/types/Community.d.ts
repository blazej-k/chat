interface Community {
    users: {
        name: string,
        date: date,
        sex: string,
        _id: string
    }[], 
    groups: Group[],
}