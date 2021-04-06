interface FriendInfo {
    sender: string
    recipient: string
}

interface ConfirmFriend {
    waiter: string,
    recipient: string,
    decision: 'accept' | 'reject'
}

interface Friend {
    login: string,
    date: date,
    sex: Sex,
}