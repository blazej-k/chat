const addUserToGroup =
    async (ENDPOINT: string, group: Group, login: string, sex: string, decision: Decission = 'accept'): Promise<Response> => {
        return await fetch(ENDPOINT || '', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ group, login, sex, decision }),
        })
    }

export default addUserToGroup