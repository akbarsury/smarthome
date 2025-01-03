type messageHandlerResponse = {
    type: 'string' | 'array' | 'object',
    name?: string,
    data: string | any[] | {}
} | null

export const messageHandler = (message: string): messageHandlerResponse => {
    let response: messageHandlerResponse = null

    const { responseType, data } = JSON.parse(message)

    switch (responseType) {
        case "items-data":
            break;
        case "Response-object":
            break;
        case "Response-array":
            break;
        case "Sync":
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