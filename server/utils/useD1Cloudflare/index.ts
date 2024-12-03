import { type H3Event } from 'h3';
import { type AnyD1Database, drizzle } from "drizzle-orm/d1"

export interface Env {
    D1_DB: AnyD1Database;
}

const initializeDrizzle = (event: H3Event, D1Binding: string) => {
    const CfEnv = event.context.cloudflare.env
    const dbLink = CfEnv[D1Binding]
    return drizzle(dbLink)
}

export default initializeDrizzle

const x = defineEventHandler((event) => {
    return {
        o1: "oke 1",
        o2: "oke 2"
    }
})


export { x as drizzleX }