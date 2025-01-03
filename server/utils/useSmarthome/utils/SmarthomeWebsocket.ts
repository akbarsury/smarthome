import { type Peer } from "crossws"
import { useUnitControlledItems } from "./controlledItems"

export class SmarthomeWebsocket {
    constructor() {
        this.jobs = []
        this.clientToInit = []
    }

    private unit?: string;
    private nodePeer: Peer | undefined;

    private clientToInit: string[];

    private jobs: {
        id: string,
        peer: Peer,
        job: any
    }[];

    updateUnit = (unitName: string) => {
        this.unit = unitName
    }

    clientOpenConnection = (peer: Peer) => {
        this.clientToInit
        this.clientToInit.push(peer.id)
    }

    clientInit = async (peer: Peer): Promise<boolean> => {
        this.clientToInit.splice(
            this.clientToInit.length >= 11 ? 1 : this.clientToInit.indexOf(peer.id), this.clientToInit.length >= 11 ? this.clientToInit.length : 1
        );
        //
        console.log({ 'client to ini length': this.clientToInit.length });
        const initiatedClient = await this.isClientInitiated(peer).then(async (client) => {
            if (client && this.unit) {
                peer.subscribe('client');
                peer.send(await useUnitControlledItems(this.unit).then((controlledItems) => {
                    return !controlledItems.valid ? JSON.stringify({ responseType: "items-data", data: [] }) : JSON.stringify({
                        responseType: "items-data", data: controlledItems.items.map((item) => {
                            let _item = { ...item }
                            _item.label = item.name
                            _item.name = item.name.replace('-', ' ')
                            return _item;
                        })
                    })
                }))
            };
            return client
        });
        return initiatedClient;
        //
    }

    isClientInitiated = async (peer: Peer): Promise<boolean> => this.clientToInit.includes(peer.id) ? false : true

    isNodePeer = (peer: Peer): boolean => peer === this.nodePeer

    nodeConnect = async (peer: Peer): Promise<boolean> => {
        this.nodePeer = peer;
        this.nodePeer.unsubscribe('client');
        return this.nodePeer ? true : false
    }

    nodeDisconnect = async (): Promise<boolean> => {
        this.nodePeer = undefined
        return this.nodePeer ? false : true
    }

    messageHandler = async (peer: Peer, message: string) => {
        const messageJson: {
            requestAction: string,
            [key: string]: any
        } = JSON.parse(message)

        let messageResponse: {
            err?: string
            message?: string,
            data?: typeof messageJson
        } | null

        const _default = async (): Promise<typeof messageResponse> => {
            messageResponse = null
            if (messageJson.requestAction === 'assign-node-server') {
                if (messageJson.credential === useRuntimeConfig().wsNodeCredential) {
                    await this.nodeConnect(peer).then((nodeConnectStatus) => {
                        console.log(nodeConnectStatus ? "Node connect success" : "Node connect failed");
                    })
                }
            }
            else if (messageJson.requestAction === 'client-init') {
                await this.clientInit(peer);
            }
            else if (peer === this.nodePeer) {
                await nodeMessageHandler()
            }
            if (await this.isClientInitiated(peer)) {
                await clientMessageHandler()
            }

            else {
                messageResponse = {
                    err: "Invalid message",
                    message
                }
                peer.send(JSON.stringify(messageResponse));
                peer.terminate();
            }

            return messageResponse;
        }

        const nodeMessageHandler = async (): Promise<string | undefined> => {
            switch (messageJson.requestAction) {
                case 'Response-task':
                    return undefined
                case 'Sync':
                    console.log(
                        '// tes send to client'
                    );
                    peer.publish('client', message)

                    return undefined
                default:
                    return undefined
            }
        }

        const clientMessageHandler = async (): Promise<string | undefined> => {
            switch (messageJson.requestAction) {
                // Job::id::%{job_object_JSON}:
                case 'Job':
                    server().handleJob();
                    return undefined
                default:
                    return undefined
            }
        }

        const server = () => {
            const handleJob = () => {
                const jobHandler = message.split("::")
                const jobId = `${peer.id}@${new Date().getTime()}`
                const jobToTaskConverter = () => {
                    return `Task::${jobId}::-----`
                }
                const addJobtoJobs = () => {
                    const jobObject = {
                        id: jobId,
                        peer,
                        job: JSON.parse(jobHandler[1])
                    }
                    this.jobs.push(jobObject)
                }
                try {
                    console.log({ 'job-length': this.jobs.length });

                    if (this.jobs.length === 0 && this.nodePeer !== undefined) {
                        this.nodePeer.send(jobToTaskConverter())
                        addJobtoJobs()
                    } else if (this.nodePeer !== undefined) {
                        addJobtoJobs()
                    }
                } catch (err) {
                    peer.send(`Error-job::${jobId.split('@')[1]}`)
                    peer.send({ err })
                }
            }

            return { handleJob }
        }

        const thisFunctionResponse = await _default()

        return thisFunctionResponse
    }
}