import { unitConfig, unitGpioConfig as _unitGpioConfig } from "~/server/utils/useSmarthomeWS/utils/controlledItems"

export default defineEventHandler(async (event) => {
    const { u } = getQuery(event)

    const validUnit = (typeof u === 'string') ? (await unitConfig()).validate(u) : false
    if (validUnit) {
        const unitGpioConfig = await _unitGpioConfig(u as string)
        return { unitGpioConfig }
    }
})