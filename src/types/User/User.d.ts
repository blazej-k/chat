interface User {
    login: string,
    sex: Sex,
    waitingFriends: WaitingFriend[],
    waitingGroups: WaitingGroup[],
    conversations: Conversations[],
    friends: Friend[],
    groups: Group[],
}

interface UserAuthInfo {
    login: string,
    password: string,
    sex?: Sex
}

type Sex = 'male' | 'female'
type Dialogues = {
    _id?: string
    date?: string, //to fix later
    text: string,
    from: string 
}
type Conversations = {
    login: string,
    dialogues: Dialogues[]
}
