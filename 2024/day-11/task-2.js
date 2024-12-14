import { readInput } from '../utils.js'

const main = async () => {
    const input = await readInput('day-11/input.txt')

    const inputArray = input.split(' ').map(value => Number(value))
    const map = new Map()

    const result = inputArray.reduce((acc, currentValue) => acc + blink(currentValue, 75, map), 0)

    console.log(result)
}

const blink = (value, blinks, map) => {
    if (blinks === 0) {
        return 1
    }

    if (value === 0) {
        const mapValue = map.get(`1-${blinks - 1}`)

        if (mapValue === undefined) {
            const result = blink(1, blinks - 1, map)
            map.set(`1-${blinks - 1}`, result)

            return result
        } else {
            return mapValue
        }
    } else if (String(value).length % 2 === 0) {
        const left = Number(String(value).substring(0, String(value).length / 2))
        const right = Number(String(value).substring(String(value).length / 2))

        const leftMapValue = map.get(`${left}-${blinks - 1}`)
        const rightMapValue = map.get(`${right}-${blinks - 1}`)

        if (leftMapValue === undefined && rightMapValue === undefined) {
            const leftResult = blink(left, blinks - 1, map)
            map.set(`${left}-${blinks - 1}`, leftResult)

            const rightResult = blink(right, blinks - 1, map)
            map.set(`${right}-${blinks - 1}`, rightResult)

            return leftResult + rightResult
        } else if (leftMapValue === undefined && rightMapValue !== undefined) {
            const leftResult = blink(left, blinks - 1, map)
            map.set(`${left}-${blinks - 1}`, leftResult)

            return leftResult + rightMapValue
        } else if (leftMapValue !== undefined && rightMapValue === undefined) {
            const rightResult = blink(right, blinks - 1, map)
            map.set(`${right}-${blinks - 1}`, rightResult)

            return leftMapValue + rightResult
        } else {
            return leftMapValue + rightMapValue
        }
    } else {
        const mapValue = map.get(`${value * 2024}-${blinks - 1}`)

        if (mapValue === undefined) {
            const result = blink(value * 2024, blinks - 1, map)
            map.set(`${value * 2024}-${blinks - 1}`, result)

            return result
        } else {
            return mapValue
        }
    }
}

main()