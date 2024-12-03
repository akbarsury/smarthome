import { useEventSource } from "@vueuse/core";
import { useEventBus } from "@vueuse/core/index.js";
import { eq } from "drizzle-orm";
import { connectedPeers as s_connectedPeers, controledItems as s_controledItems } from "~/server/database/drizzle/schema";
import { drizzleX } from "~/server/utils/useD1Cloudflare";

export default defineWebSocketHandler({
    async open(peer) {

        console.log(peer.id);
        // const x = drizzleX(peer)

        // console.log(x);
        // peer.send(JSON.stringify({ x }))

        // try {
        //     if (!peer.websocket.url?.startsWith(`ws://10.181.80.1:3051/`)) {
        //         console.log(`----- Peer blocked`);
        //         console.log(`----- Peer connection closed`);
        //         peer.close()
        //     }
        //     const newPeer = await db.insert(s_connectedPeers).values({
        //         peer: peer.id,
        //         createdAt: new Date().getTime().toString(),
        //         expiredAt: (new Date().getTime() + 3600).toString()
        //     }).returning({ peer: s_connectedPeers.peer }).catch(() => false)

        //     if (!newPeer) {
        //         console.log(`----- Peer connection failed`);
        //         console.log('Peer failed join channel client ');
        //         peer.close()
        //     }
        //     const controlledItems = newPeer.valueOf() !== false ? Promise.all(await db.select().from(s_controledItems).all()) : false
        //     if (controlledItems) {
        //         peer.subscribe('client')
        //         console.log(`----- Peer join channel`);
        //         console.log(`Peer ${peer} join channel client`);
        //         peer.send(JSON.stringify(controlledItems))
        //     } else {
        //         peer.send(JSON.stringify([]))
        //     }
        // } catch (e) {
        //     console.log(e);
        // }
    },
    async close(peer) {
        // const disconnectedPeer = await db.delete(s_connectedPeers).where(eq(s_connectedPeers.peer, peer.id)).returning({ peer: s_connectedPeers.peer }).catch(() => false)

        // if (disconnectedPeer.valueOf() !== false) {
        //     console.log(`Peer ${peer} disconnected`);
        // }
        console.log(`Peer ${peer} disconnected`);
    },
    message(peer, message) {
        const data = {
            id: `${peer}@${new Date().getTime()}`,
            url: peer.websocket.url,
            ...(JSON.parse(message.text()))
        }

        try {
            if (data.req.message === 'client connect') {

            }
        } catch (error) {

        }
        console.log(data);
    },
    error(peer, error) {
        console.log(`Peer ${peer} Message : `, error);
    }
})