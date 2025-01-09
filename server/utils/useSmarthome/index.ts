import { useUnit, useUnitControlledItems } from './utils/controlledItems'
import { default as _encryption } from './utils/encryption'
import { SmarthomeWebsocket } from './utils/SmarthomeWebsocket'
import { smarthomeWebsocketHandler } from './utils/smarthomeWebsocketHandler'
import SmarthomeStorage from './utils/smarthomeStorage';

const useSmarthome = () => {
    const encryption = _encryption()

    const storage = new SmarthomeStorage()

    const unit = () => {
        const get = async () => (await useUnit()).get()
        const validate = async (unitName: string) => (await useUnit()).validate(unitName)
        const add = async (unitName: string, data: any[]) => (await useUnit()).add(unitName, data)
        const sync = async (unitName: string, data: any[]) => (await useUnit()).sync(unitName, data)
        return { get, validate, add, sync }
    }
    const getControlledItems = async (unit: string) => {
        return await useUnitControlledItems(unit)
    }
    const webSocket = () => {
        const _data = new SmarthomeWebsocket()
        const ws = smarthomeWebsocketHandler(_data)
        return { _data, ws }
    }

    return { encryption, storage, unit, getControlledItems, webSocket }
}

export default useSmarthome