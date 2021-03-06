interface Group {
    groupName: string,
    groupId: string,
    members: GroupMembers[],
    dialogues: Dialogues[]
    _id?: string
}

interface GroupMembers {
    _id: string,
    login: string,
    sex: Sex
}

interface WaitingGroup {
    groupName: string,
    groupId: string,
    sender: string,
    recipient: string
    date: any,
    members: GroupMembers[],
    _id?: string
}