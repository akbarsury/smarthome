type messageHandlerResponse = {
    type: 'string' | 'array' | 'object',
    name?: string,
    data: string | any[] | {}
} | null

export const messageHandler = (messageHandlerOptions: { apiPathSyncData?: string, message: string }): messageHandlerResponse => {
    let response: messageHandlerResponse = null

    const { apiPathSyncData, message } = messageHandlerOptions
    const handler = message.split("::");

    switch (handler[0]) {
        case "Response-string":
            response = {
                type: 'string',
                data: handler[2]
            };
            break;
        case "Response-object":
            response = {
                type: 'object',
                name: handler[1],
                data: JSON.parse(handler[2])
            };
            break;
        case "Response-array":
            response = {
                type: 'array',
                name: handler[1],
                data: JSON.parse(handler[2])
            };
            break;
        case "Sync":
            response = {
                type: 'string',
                name: 'sync',
                data: handler[1]
            };
            break;
        default:
            break;
    }
    if (response !== null) {
        console.log(
            `---------------------------------\nmessage from server :\n${JSON.stringify(
                response
            )}\n---------------------------------`
        );
    }
    return response
}