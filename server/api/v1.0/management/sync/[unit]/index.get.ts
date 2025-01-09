export default defineEventHandler(async (event) => {
    const unit = getRouterParam(event, 'unit')
    const validToken = getHeader(event, "Authorization") === `Bearer ${useRuntimeConfig().nodeCredential}`

    if (unit === useRuntimeConfig().public.nodeSerialNumber) {
        let controlledItems: {
            port: number;
            name: string;
            "current-status": number;
            actions: { status: boolean, time?: number }[];
        }[] | null;
        const firestore = useFirebaseAdmin.firestore;
        const readControlledItems = await firestore.doc(`${useRuntimeConfig().public.nodeSerialNumber}/controlled-items`).get().then(async (_controlledItems) => {
            return await useSmarthome().unit().sync(useRuntimeConfig().public.nodeSerialNumber, controlledItems!).then(() => {
                return _controlledItems
            })
        })
        if (readControlledItems.exists) {
            controlledItems = readControlledItems.data()!.data as typeof controlledItems | null
        } else {
            const port = [16, 5, 4, 0, 2, 14, 12, 13]
            controlledItems = port.map((port, index) => {
                const actions = [{ status: false }, { status: false }, { status: false, time: 1 }, { status: false, time: 1 }]
                return {
                    port,
                    "name": `switch-${index + 1}`,
                    "current-status": 0,
                    actions
                }
            })
            console.log({ data: controlledItems });
            controlledItems = await firestore.doc(`${useRuntimeConfig().public.nodeSerialNumber}/controlled-items`).create({ data: controlledItems }).then(async () => {
                return await useSmarthome().unit().add(useRuntimeConfig().public.nodeSerialNumber, controlledItems!).then(() => {
                    return controlledItems
                })
            })
        }
        return JSON.stringify({
            data: {
                unit,
                "controlled-items": validToken ? controlledItems : undefined
            }
        })
    }
})