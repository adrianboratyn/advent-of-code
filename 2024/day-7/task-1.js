import { readInput } from '../utils.js'

const main = async () => {
    const input = await readInput('day-7/input.txt')
    const lines = input.split('\n').map(line => {
        const [sum, numbersLine] = line.split(':')
        const numbers = numbersLine.trim().split(' ')

        return { sum, numbers }
    })

    let result = 0

    for (let i = 0; i < lines.length; i++) {
        let sums = new Set()
        count(lines[i].numbers, '+', 0, sums)
        count(lines[i].numbers, '*', 1, sums)

        if (sums.has(Number(lines[i].sum))) {
            result += Number(lines[i].sum)
        }
    }

    console.log(result)
}

const count = (array, operator, currentSum, sums) => {
    if (array.length === 0) {
        sums.add(currentSum)

        return
    }

    if (operator === '+') {
        currentSum += Number(array[0])
    }

    if (operator === '*') {
        currentSum *= Number(array[0])
    }

    count(array.slice(1), '+', currentSum, sums)
    count(array.slice(1), '*', currentSum, sums)
}

main()