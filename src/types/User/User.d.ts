interface User {
    login: string,
    sex: Sex,
    waitingFriends: WaitingFriend[],
    waitingGroups: WaitingGroup[],
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
    sex?: Sex
}

type Sex = 'male' | 'female'
