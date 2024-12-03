import { defineConfig } from "drizzle-kit"

export default defineConfig({
    dialect: "sqlite",
    schema: "./server/database/drizzle/schema.ts",
    out: "./server/database/drizzle",
    verbose: true,
    driver: "d1-http",
    dbCredentials: {
        accountId: "071dd3995396399264162e12acedfdc9",
        databaseId: "148ef8ed-4d5f-4c07-90f2-7a497a6c865f",
        token: "8TxAKDe2BiFmSblE8D54f3ZrKKDJzo-rB0_gT9Zh"
    }
})