import { readInput } from '../utils.js'

const formatInput = (input) => {
    return input.split('\n').map(line => line.split(' ').map(Number))
}

const main = async () => {
    const input = await readInput('day-2/input.txt')
    const formatedInput = formatInput(input)
    let result = 0

    for (let i = 0; i < formatedInput.length; i++) {
        const isSafeResults = []

        for (let j = 0; j < formatedInput[i].length; j++) {
            const tempArray = formatedInput[i].toSpliced(j, 1)

            isSafeResults.push(isSafe(tempArray))
        }

        const hasSafeLevel = isSafeResults.some(result => result === true)

        if (hasSafeLevel) {
            result++
        }
    }

    console.log(result)
}

const isSafe = (level) => {
    let isSafe = true
    let isAllIncreasing = true
    let isAllDecreasing = true

    for (let j = 0; j < level.length - 1; j++) {
        const difference = Math.abs(level[j] - level[j + 1])

        if (difference < 1 || difference > 3) {
            isSafe = false
        }

        if (level[j] > level[j + 1]) {
            isAllIncreasing = false
        }

        if (level[j] < level[j + 1]) {
            isAllDecreasing = false
        }
    }

    if (isSafe && (isAllIncreasing || isAllDecreasing)) {
        return true
    }

    return false
}

main()