import sseAdapter from "crossws/adapters/sse";

export default defineEventHandler(async (event) => {
    const requestUrl = getRequestURL(event)
    console.log(requestUrl.toString());

    const response = createEventStream(event)

    const unit = getRouterParam(event, "unit")
    if (unit) {
        const ws = unit ? sseAdapter({
            bidir: true, // Enable bidirectional messaging support
            async resolve(req) {
                return useSmarthome().webSocket(unit).ws
            }
        }) : undefined
        const request = toWebRequest(event)
        const wsResponse = ws?.fetch(request).then((result) => {
            console.log({ wsResponseJSON: result });

            response.push(JSON.stringify({ ok: "ok" }))
        })
    }

    return response.send()
})