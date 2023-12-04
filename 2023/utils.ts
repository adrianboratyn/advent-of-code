import { readFile } from 'node:fs/promises'

export const readInput = (path: string) => {
    const filePath = new URL(path, import.meta.url);

    return readFile(filePath, { encoding: 'utf8' })
}

export const isNumeric = (num: any) => (typeof(num) === 'number' || typeof(num) === "string" && num.trim() !== '') && !isNaN(num as number)
