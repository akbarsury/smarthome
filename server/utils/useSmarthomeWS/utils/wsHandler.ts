import { type Hooks, type Peer } from "crossws"
import { getControlledItems } from "./controlledItems"

export class SmarthomeWebsocket {
    constructor(unit: string) {
        this.unit = unit
        this.jobs = []
        this.clientToInit = []
    }

    private unit: string;
    private nodePeer: Peer | undefined;

    private clientToInit: string[];

    private jobs: {
        id: string,
        peer: Peer,
        job: any
    }[];

    clientOpenConnection = (peer: Peer) => {
        this.clientToInit
        this.clientToInit.push(peer.id)
    }

    clientInit = async (peer: Peer) => {
        //
        console.log({ 'client to ini length': this.clientToInit.length });
        //
        this.clientToInit.splice(
            this.clientToInit.indexOf(peer.id), this.clientToInit.length >= 11 ? 11 : 1
        );
        //
        console.log({ 'client to ini length': this.clientToInit.length });
        //
        peer.subscribe('client');
        peer.send(`Response-object::controlledItems::${JSON.stringify(await getControlledItems(this.unit))}`)
    }

    isClientInitiated = async (peer: Peer): Promise<boolean> => {
        return this.clientToInit.includes(peer.id) ? false : true
    }

    isNodePeer = (peer: Peer): boolean => {
        if (peer === this.nodePeer) {
            return true
        } else {
            return false
        }
    }

    nodeConnect = async (peer: Peer): Promise<boolean> => {
        try {
            this.nodePeer = peer;
            this.nodePeer.unsubscribe('client');
        } catch (err) {
            //
            console.log({ err });
            //
        } finally {
            return this.nodePeer !== undefined ? true : false
        }
    }

    nodeDisconnect = async (): Promise<boolean> => {
        try {
            this.nodePeer = undefined
        } catch (err) {
            //
            console.log({ err });
            //
        } finally {
            return this.nodePeer === undefined ? true : false
        }
    }

    messageHandler = (peer: Peer, message: string) => {
        const _default = async (): Promise<string | undefined> => {
            const handler = message.split("::")

            if (process.env.NODE_ENV === 'development' && (handler[0] === 'Send-to-node' || handler[0] === 'Publish-to-client')) {
                if (this.nodePeer && handler[0] === 'Send-to-node') {
                    this.nodePeer.send(handler[1])
                } else if (handler[0] === 'Publish-to-client') {
                    peer.publish('client', message)
                }
                return undefined
            }


            if (peer === this.nodePeer || handler[0] === 'Assign-node-server') {
                return (await node())
            }

            if (handler[0] === 'Client-init' || await this.isClientInitiated(peer)) {
                return (await client())
            }



            else {
                peer.send("Client-not-initiated");
                peer.terminate();
            }

        }

        const node = async (): Promise<string | undefined> => {
            const handler = message.split("::")
            switch (handler[0]) {
                case 'Assign-node-server':
                    if (handler[1] === useRuntimeConfig().wsNodeCredential) {
                        await this.nodeConnect(peer)
                    }
                    return undefined
                // ResponseTask::id::%{response_task_code}
                case 'Response-task':
                    return undefined
                // tes send to client
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

        const client = async (): Promise<string | undefined> => {
            const handler = message.split("::")
            switch (handler[0]) {
                case 'Client-init':
                    this.clientInit(peer);
                    return undefined
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

        return { _default }
    }
}

export const wsHandler = (smarthomeWebsocket: SmarthomeWebsocket): Partial<Hooks> => {
    return {
        upgrade(request) {
            // 
            // console.log(request.headers);
            // 
        },
        async open(peer) {
            smarthomeWebsocket.clientOpenConnection(peer);
            // 
            console.log(`Client connection open: ${peer.id}`);
            // 
        },
        async close(peer) {
            if (smarthomeWebsocket.isNodePeer(peer)) {
                smarthomeWebsocket.nodeDisconnect().then(() => {
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
            await smarthomeWebsocket.messageHandler(peer, message.text())._default()

        },
        async error(peer, error) {
            if (smarthomeWebsocket.isNodePeer(peer)) {
                smarthomeWebsocket.nodeDisconnect().then(() => {
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
