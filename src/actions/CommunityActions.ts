import { Dispatch } from "react"

export const CREATEGROUP = 'creategroup'

export const createGroup = (groupInfo: {groupName: string, login: string, sex: 'male' | 'female'}) => async (dispatch: Dispatch<CommunityActionType>) => {
    const ENDPOINT = process.env.CREATE_GROUP

    await fetch(ENDPOINT || '', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({groupInfo})
    })
    .then(res => res.json())
    .then((res: CommunityGroup) => {
        dispatch({type: CREATEGROUP, payload: res})
    })
}