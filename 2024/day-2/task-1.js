import { readInput } from '../utils.js'

const formatInput = (input) => {
    return input.split('\n').map(line => line.split(' ').map(Number))
}

const main = async () => {
    const input = await readInput('day-2/input.txt')
    const formatedInput = formatInput(input)

    let result = 0

    for (let i = 0; i < formatedInput.length; i++) {
        let isSafe = true
        let isAllIncreasing = true
        let isAllDecreasing = true

        for (let j = 0; j < formatedInput[i].length - 1; j++) {
            const difference = Math.abs(formatedInput[i][j] - formatedInput[i][j + 1])

            if (difference < 1 || difference > 3) {
                isSafe = false
            }

            if (formatedInput[i][j] > formatedInput[i][j + 1]) {
                isAllIncreasing = false
            }

            if (formatedInput[i][j] < formatedInput[i][j + 1]) {
                isAllDecreasing = false
            }
        }

        if (isSafe && (isAllIncreasing || isAllDecreasing)) {
            result++
        }
    }

    console.log(result)
}

main()