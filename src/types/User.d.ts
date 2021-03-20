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
        dialogues: {
            date: any, //to fix later
            text: string
        }[]
    },
    friends: {
        name: string,
        date: date,
        sex: string,
        _id: string
    }[], 
    groups: Group[],
}

interface UserAuthInfo {
    login: string,
    password: string,
    sex?: 'male' | 'female'
}