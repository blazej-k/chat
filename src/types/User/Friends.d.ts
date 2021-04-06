interface FriendInfo {
    sender: string
    recipient: string
}

interface ConfirmFriend {
    waiter: string,
    recipient: string,
    decision: Decission
}

interface Friend {
    login: string,
    date: date,
    sex: Sex,
}