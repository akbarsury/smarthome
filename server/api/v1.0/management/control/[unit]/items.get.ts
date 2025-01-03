export default defineEventHandler(async (event) => {
    const unit = getRouterParam(event, 'unit')
    if (unit && unit !== '')
        return await useSmarthome().getControlledItems(unit).then((controlledItems) => {
            return !controlledItems.valid ? setResponseStatus(event, 404) : JSON.stringify({ data: controlledItems.items })
        })
})