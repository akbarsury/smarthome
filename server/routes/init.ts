import { randomBytes } from "node:crypto";

export default defineEventHandler((event) => {
    const usAuthCookie = getCookie(event, 'us_auth')
    console.warn({ usAuthCookie });

    return usAuthCookie ? { status: true, token: randomBytes(32).toString('hex') } : null
})