import { type Hooks } from "crossws"
import { SmarthomeWebsocket } from "./SmarthomeWebsocket"

export const smarthomeWebsocketHandler = (SmarthomeWebsocket: SmarthomeWebsocket): Partial<Hooks> => {
    return {
        async upgrade(request) {
            console.warn("[WS UPGRADE]");

            const unit = request.url.split("/").pop()
            if (unit)
                SmarthomeWebsocket.updateUnit(unit)
            return
        },
        async open(peer) {
            SmarthomeWebsocket.clientOpenConnection(peer);
            console.log(`Client connection open: ${peer.id} @ ${peer}`);
            console.log(peer.websocket.url);
        },
        async close(peer) {
            // useStorage('db').removeItem(`peer:${peer.id}.json`)
            if (SmarthomeWebsocket.isNodePeer(peer)) {
                SmarthomeWebsocket.nodeDisconnect().then(() => {
                    console.log(`Node connection close: ${peer.id}`);
                }).catch(() => {
                    console.log(`Client connection close: ${peer.id}`);
                });
            } else {
                // 
                console.log(`Client connection close: ${peer.id}`);
                // 
            }
        },
        async message(peer, message) {
            // 
            console.log(`Messege from peer (${peer.id}) : ${message.text()}`);
            // 
            SmarthomeWebsocket.messageHandler(peer, message.text())
        },
        async error(peer, error) {
            if (SmarthomeWebsocket.isNodePeer(peer)) {
                SmarthomeWebsocket.nodeDisconnect().then(() => {
                    console.log(`Node peer (${peer.id}) connection error: `, error);
                }).catch(() => {
                    console.log(`Client peer (${peer.id}) connection error: `, error);
                });
            } else {
                // 
                console.log(`Client peer (${peer.id}) connection error: `, error);
                // 
            }
        }
    }
}
