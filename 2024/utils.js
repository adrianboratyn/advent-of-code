import { readFile } from 'node:fs/promises'

export const readInput = (path) => {
    const filePath = new URL(path, import.meta.url);

    return readFile(filePath, { encoding: 'utf8' })
}
