export default defineEventHandler(async (event) => {
    const unit = getRouterParam(event, 'unit')
    const token = getHeader(event, "Authorization");
    if (unit === useRuntimeConfig().public.nodeSerialNumber && token === `Bearer ${useRuntimeConfig().wsNodeCredential}`) {
        const firestore = useFirebaseAdmin.firestore;
        const readControlledItems = await firestore.doc(`${useRuntimeConfig().wsNodeCredential}/controlled-items`).get()
        if (readControlledItems.exists) {
            const controlledItems = Object.keys(readControlledItems.data() as {}) || []
            await useSmarthome().unit().sync(useRuntimeConfig().public.nodeSerialNumber, controlledItems!)
            return JSON.stringify({
                data: {
                    unit,
                    "controlled-items": controlledItems
                }
            })
        } else {
            return {
                data: {
                    unit,
                    "controlled-items": []
                }
            }
        }
    }
})