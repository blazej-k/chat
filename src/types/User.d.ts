interface User {
    login: string,
    sex: 'male' | 'female',
    waitingFriends: {
        name: string,
        date: date,
        _id: string
    }[],
    waitingGroups: {
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

interface UserAuthInfo {
    login: string,
    password: string,
    sex?: 'male' | 'female'
}