import { getServerSession } from "#auth"
type NewUser = {
    email?: string
    password?: string
    name?: string
}

export default defineEventHandler(async (event) => {
    const session = await getServerSession(event)
    const isSessionNotExpires = session ? new Date(session.expires).getTime() > new Date().getTime() : false
    if (!isSessionNotExpires) return setResponseStatus(event, 401, "Unauthorized")
    else {
        const { email, password, name } = await readBody(event) as NewUser
        if (!(email && password && name)) return setResponseStatus(event, 400, "Bad Request")
        const user = await useSmarthome().storage.user().add({ email, password, name })
        return user ? {
            message: "Success create user",
            data: {
                user: [user].map((user) => {
                    return {
                        id: user.uid,
                        email: user.email || null,
                        name: user.displayName || null
                    }
                })[0]
            }
        } : {
            message: "Failed create user",
            data: { user: null }
        }
    }
})