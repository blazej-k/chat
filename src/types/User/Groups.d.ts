interface GroupInfo {
    sender: string,
    groupName: string,
    groupId: string,
    date: any,
    members: GroupMembers[]
}

interface ConfirmGroup {
    groupName: string,
    groupId: string,
    newMember: string
    decission: Decission
}

interface Group {
    groupName: string,
    groupId: string,
    members: GroupMembers[],
    dialogues: {
        login: string,
        date: any,
        text: string
    }[]
    _id?: string
}

interface GroupMembers {
    _id: string,
    login: string,
    sex: Sex
}