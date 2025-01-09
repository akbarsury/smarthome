import { readFile, writeFile } from 'node:fs/promises';
import { existsSync, mkdirSync } from 'node:fs';

const useDataFile = <T>(JSONfileName: string, InitialData?: T[]) => {
    let data: any[] | null = null;
    if (!existsSync("./data-file")) {
        mkdirSync("./data-file");
        setTimeout(() => { }, 2000)
    }

    const _default = async () => {
        try {
            data = await readFile(`./data-file/${JSONfileName}.json`, 'utf-8').then((_data) => {
                return JSON.parse(_data)
            })

        } catch {
            await writeFile(`./data-file/${JSONfileName}.json`, JSON.stringify(InitialData || []))
                .then(async () => InitialData || [])
        } finally {
            data = data || await readFile(`./data-file/${JSONfileName}.json`, 'utf-8').then((_data) => {
                return JSON.parse(_data)
            })
        }
        return data || [];
    }

    const replace = async () => await writeFile(`./data-file/${JSONfileName}.json`, JSON.stringify(InitialData || []))
        .then(async () => InitialData || []).catch(() => undefined)

    return { _default, replace }
}

// const unitGpioConfig = async (unit: string) => (await useUnit()).validate(unit) ? useDataFile(`gpio-${unit}`,
//     [16, 5, 4, 0, 2, 14, 12, 13, 15, 3, 1].map((gpio, index) => {
//         return {
//             port: index,
//             pin: gpio,
//             type: "disable"
//         }
//     })) : []

export const useUnit = async () => {
    const _data: string[] = await useDataFile(`units`)._default()
    const get = async () => _data
    const add = async <T>(unitName: string, data: T[]): Promise<string[] | null> => {
        if (!validate(unitName)) {
            _data.push(unitName)
            return await useDataFile('units', _data).replace().then(async (units) => {
                return await useDataFile(`unit-${unitName}`, data)._default().then(() => {
                    return units
                })
            }) || null
        } else {
            return null
        }
    }
    const validate = (unitName: string) => _data.includes(unitName)
    const sync = async <T>(unitName: string, data: T[]) => {
        return validate(unitName) ? await useDataFile(`units`, data).replace() || null : null
    }
    return { get, validate, add, sync }
}

export const useUnitControlledItems = async (unit: string) => {
    return (await useUnit()).validate(unit) ?
        { valid: true, items: await useDataFile(`unit-${unit}`)._default() } : { valid: false, items: [] }
}