interface User {
    login: string,
    sex: Sex,
    waitingFriends: {
        sender: string,
        date: date,
        _id: string
    }[],
    waitingGroups: {
        groupName: string,
        groupId: string,
        sender: string
        date: any,
        members: GroupMembers[],
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
    sex?: Sex
}

type Sex = 'male' | 'female'
