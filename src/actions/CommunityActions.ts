import { Dispatch } from "react"
import addUserToGroup from "./helpers/addUsertoGroup"
import { JOINTOGROUP } from './UserActions'
export const GETUSERS = 'getusers'

export const CREATEGROUP = 'creategroup'
export const COMMUNITYERROR = 'communityerror'

export const createGroup = (groupInfo: { groupName: string, login: string, sex: Sex }) =>
    async (dispatch: Dispatch<CommunityActionType | JoinToGroup>) => {
        const { login, sex } = groupInfo
        const ENDPOINT = process.env.CREATE_GROUP

        await fetch(ENDPOINT || '', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ groupInfo })
        })
            .then(res => res.json())
            .then((res: CommunityGroup) => {
                dispatch({ type: CREATEGROUP, payload: res })
                return res
            })
            .then(async ({ groupName, groupId }) => {
                const ENDPOINT = process.env.JOIN_TO_GROUP
                const group = {
                    groupName,
                    groupId,
                    members: [],
                    dialogues: []
                }
                dispatch({ type: JOINTOGROUP, payload: group })
                addUserToGroup(ENDPOINT || '', group, login, sex)
            })
            .catch(() => dispatch({ type: COMMUNITYERROR, payload: 'Sorry, we can\'t do this now' }))
    }

export const getUsers = () => async (dispatch: Dispatch<CommunityActionType>) => {
    const ENDPOINT = process.env.GET_USERS
    await fetch(ENDPOINT || '')
        .then(res => res.json())
        .then((res: CommunityUser[]) => dispatch({ type: GETUSERS, payload: res }))
}
