import { getServerSession } from "#auth"

export default defineEventHandler(async (event) => {
    const session = await getServerSession(event)
    const isSessionNotExpires = session ? new Date(session.expires).getTime() > new Date().getTime() : false
    if (!isSessionNotExpires) return setResponseStatus(event, 401, "Unauthorized")
    else {
        const users = await useSmarthome().storage.user().get()
        return users.users.length !== 0 ? {
            message: "Data users exist",
            data: {
                users: users.users.map((user) => {
                    return {
                        id: user.uid,
                        email: user.email || null,
                        name: user.displayName || null
                    }
                })
            }
        } : {
            message: "Data users empty",
            data: { users: null }
        }
    }
})