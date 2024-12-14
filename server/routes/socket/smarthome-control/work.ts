import { readFile, writeFile } from 'node:fs/promises';
import { Peer } from "crossws"

let serverPeer = "";

const getControlledItems = async () => {
    let data: string = '';
    try {
        data = await readFile('./controlled-items.json', 'utf-8').then((data) => {
            return data
        }).catch(async (err) => {
            data = await writeFile('./controlled-items.json', JSON.stringify([])).then(async () => { return '' })
            return data
        })
    } catch (err) {
        data = await writeFile('./controlled-items.json', JSON.stringify([])).then(async () => { return '' })
        return data
    } finally {
        if (data === '') {
            data = await readFile('./controlled-items.json', 'utf-8').then((data) => {
                return data
            })
        }
        return data;
    }
}

const serverPeerConnect = async (peer: Peer, message: string) => {
    serverPeer = peer.id
    const controlledItems = await getControlledItems()
    peer.unsubscribe('client')
    peer.subscribe('server')
    peer.publish('client', `ResponsArray::controlledItems::${controlledItems}`)
}

const serverPeerDisonnect = async (peer: Peer) => {
    serverPeer = ""
    peer.unsubscribe('server')
}

const messageHandle = async (peer: Peer, message: string) => {
    const handler = message.split("::")
    let responseString = ""
    switch (handler[0]) {
        case 'Assign-Server-Peer':
            serverPeerConnect(peer, message)
        case 'Client-connect':
            peer.subscribe('client');
            messageHandle(peer, 'Request-Action::get-controlled-items')
        case 'Request-Action':
            switch (handler[1]) {
                case "get-controlled-items":
                    const controlledItems = serverPeer ? await getControlledItems() : JSON.stringify([]);
                    responseString = `ResponsArray::controlledItems::${controlledItems}`
                    peer.send(responseString)
                    break;
                default:
                    break;
            }
            break;
        default:
            break;
    }
    return responseString
}

export default defineWebSocketHandler({
    async open(peer) {
        console.log(peer.id);
        peer.send('success')
    },
    async close(peer) {
        if (peer.id == serverPeer) {
            serverPeerDisonnect(peer)
            console.log(`Server connection close: `, peer.id);
        }
        console.log(`Peer ${peer} disconnected`);
    },
    async message(peer, message) {
        await messageHandle(peer, message.text())
    },
    error(peer, error) {
        if (peer.id == serverPeer) {
            serverPeerDisonnect(peer)
            console.log(`Server peer ${peer.id} connection error: `, error);
        }
        console.log(`Peer ${peer} Message : `, error);
    }
})