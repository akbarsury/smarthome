import { messageHandler as _messageHandler } from "./messageHandler"

const useSmarthomeWebsocket = (apiPathSyncData?: string) => {
    const messageHandler = (message: string) => _messageHandler(message)
    return { messageHandler }
}

export { useSmarthomeWebsocket }