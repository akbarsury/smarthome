import { controledItems } from "../../database/drizzle/schema"

export default defineEventHandler(async (event) => {
    const eventStart = new Date().toLocaleTimeString()
    const eventStream = createEventStream(event)
    const db = useD1Cloudflare(event, "D1_DB")
    const newData = await db.insert(controledItems).values({
        name: "i computer 1",
        label: "i-computer-1",
    }).onConflictDoNothing().catch((e) => e)

    const dataList = await db.select().from(controledItems).all()

    const interval = setInterval(async () => {
        const data = { eventStart, messageTime: `${new Date().toLocaleTimeString()}`, data: dataList }
        await eventStream.push(JSON.stringify(data))
    }, 2000)


    eventStream.onClosed(async () => {
        clearInterval(interval)
        await eventStream.close()
    })

    return eventStream.send()
})