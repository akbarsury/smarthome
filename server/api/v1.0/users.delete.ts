import { getServerSession } from "#auth"

type DeleteUser = {
    id?: string
}

export default defineEventHandler(async (event) => {
    const session = await getServerSession(event)
    const isSessionNotExpires = session ? new Date(session.expires).getTime() > new Date().getTime() : false
    if (!isSessionNotExpires) return setResponseStatus(event, 401, "Unauthorized")
    else {
        const { id } = await readBody(event) as DeleteUser
        if (!id) return setResponseStatus(event, 400, "Bad Request")
        const user = await useSmarthome().storage.user().remove(id)
        return user ? {
            message: "Success delete user",
            data: {
                user: [user].map((user) => {
                    return {
                        id
                    }
                })[0]
            }
        } : {
            message: "Failed delete user",
            data: { user: null }
        }
    }
})