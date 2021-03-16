interface User {
    login: string,
    sex: 'male' | 'female',
    friends: {
        name: string,
        date: date,
        sex: string,
        _id: string
    }[], 
    groups: {
        name: string,
        members: number
    }[],
    waitingFriends: {
        name: string,
        date: date,
        _id: string
    }[],
    conversations: {
        login: string,
        dialogues: [
            {
                date: date,
                text: string
            }
        ]
    }[]
}