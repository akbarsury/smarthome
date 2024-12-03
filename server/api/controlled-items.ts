import { controledItems } from "../database/drizzle/schema"

export default defineEventHandler(async (event) => {
    const db = useD1Cloudflare(event, "D1_DB")
    const newData = await db.insert(controledItems).values({
        name: "i computer 1",
        label: "i-computer-1",
    }).onConflictDoNothing().catch((e) => e)

    const dataList = await db.select().from(controledItems).all()
    return JSON.stringify(dataList)
})