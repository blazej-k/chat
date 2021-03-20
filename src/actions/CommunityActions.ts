import { Dispatch } from "react"

export const CREATEGROUP = 'creategroup'

export const createGroup = (groupName: string, login: string, sex: 'male' | 'female') => async (dispatch: Dispatch<CommunityActionType>) => {
    const ENDPOINT = process.env.CREATE_GROUP

    await fetch(ENDPOINT || '', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({groupName, login, sex})
    })
    .then(res => res.json())
    .then((res: Group) => dispatch({type: CREATEGROUP, payload: res}))
}