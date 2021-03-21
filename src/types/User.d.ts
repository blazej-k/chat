interface User {
    login: string,
    sex: 'male' | 'female',
    waitingFriends: {
        login: string,
        date: date,
        _id: string
    }[],
    waitingGroups: {
        login: string,
        date: date,
        _id: string
    }[],
    conversations: {
        login: string,
        dialogues: {
            date: any, //to fix later
            text: string
        }[]
    },
    friends: Friend[], 
    groups: Group[],
}

interface UserAuthInfo {
    login: string,
    password: string,
    sex?: 'male' | 'female'
}