import { readFile, writeFile } from 'node:fs/promises';


export default defineWebSocketHandler({
    async open(peer) {
        console.log(peer.id);
        await readFile('./data.json', 'utf-8').then((data) => {
            console.log('success');
            console.log({ data });
            peer.send('success')
            peer.send(JSON.stringify(data))
        }).catch(async (err) => {
            console.log(`Error Code : ${err.code}`);
            console.log(err);
            let _data = { errorCode: 'Error reading file', errorMessage: '' }
            if (err.code == 'ENOENT') {
                await writeFile('./data.json', JSON.stringify({ controlledItems: [] }))
                _data = { errorCode: err.code, errorMessage: err.message }
            }
            console.log('error');
            console.log({ data: _data });
            peer.send('error');
            peer.send(JSON.stringify(_data))
        })
    },
    async close(peer) {
        console.log(`Peer ${peer} disconnected`);
    },
    async message(peer, message) {
        const jsonFile = await readFile('./data.json', 'utf-8')
        peer.send(JSON.stringify({ data: jsonFile }))
        const data = {
            id: `${peer}@${new Date().getTime()}`,
            url: peer.websocket.url,
            ...(JSON.parse(message.text()))
        }
        console.log(JSON.stringify({ data }));
        peer.send(JSON.stringify({ data }))
    },
    error(peer, error) {
        console.log(`Peer ${peer} Message : `, error);
    }
})