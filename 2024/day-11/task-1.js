import { readInput } from '../utils.js'

const main = async () => {
    const input = await readInput('day-11/input.txt')

    let inputArray = input.split(' ').map(value => Number(value))

    for (let i = 0; i < 25; i++) {
        inputArray = blink(inputArray)
    }

    console.log(inputArray.length)
}

const blink = inputArray => {
    const result = []

    for (let i = 0; i < inputArray.length; i++) {
        if (inputArray[i] === 0) {
            result.push(1)
        } else if (String(inputArray[i]).length % 2 === 0) {
            const stringNumber = String(inputArray[i])
            const length = stringNumber.length
            const left = Number(stringNumber.substring(0, length / 2))
            const right = Number(stringNumber.substring(length / 2))

            result.push(left)
            result.push(right)
        } else {
            result.push(inputArray[i] * 2024)
        }
    }

    return result
}

main()