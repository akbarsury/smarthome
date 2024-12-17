import { readFile, writeFile } from 'node:fs/promises';
import { existsSync, mkdirSync } from 'node:fs';

export const useDataFile = async (unit: string, unitArray?: any[]) => {
    let data: any[] = [];

    try {
        if (!existsSync("./data-file")) {
            mkdirSync("./data-file");
        }
        else {
            data = await readFile(`./data-file/${unit}.json`, 'utf-8').then((_data) => {
                return JSON.parse(_data)
            })
        }
    } catch {
        await writeFile(`./data-file/${unit}.json`, JSON.stringify(unitArray || []))
            .then(async () => {
                data = await readFile(`./data-file/${unit}.json`, 'utf-8').then((_data) => {
                    return JSON.parse(_data)
                })
            })
    } finally {
        data = data.length == 0 ? await readFile(`./data-file/${unit}.json`, 'utf-8').then((_data) => {
            return JSON.parse(_data)
        }) : data
    }

    return data;
}

export const unitConfig = async () => {
    const data = await useDataFile(`units`)
    const validate = (unit: string) => data.includes(unit)

    return { data, validate }
}

export const unitGpioConfig = async (unit: string) => (await unitConfig()).validate(unit) ? useDataFile(`gpio-${unit}`,
    [16, 5, 4, 0, 2, 14, 12, 13, 15, 3, 1].map((gpio, index) => {
        return {
            port: index,
            pin: gpio,
            type: "disable"
        }
    })) : []

export const getControlledItems = async (unit: string) => (await unitConfig()).validate(unit) ?
    await useDataFile(`unit-on-${unit}`) : []