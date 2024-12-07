import { readInput } from '../utils.js'

const main = async () => {
    const input = await readInput('day-1/input.txt')

    const [leftList, rightList] = input
        .split('\n')
        .reduce((acc, line) => {
            const [left, right] = line.split('   ')

            return [
                [...acc[0], Number(left)],
                [...acc[1], Number(right)]
            ]
        }, [[],[]])

    const leftSorted = leftList.toSorted((a, b) => a - b)
    const rightSorted = rightList.toSorted((a, b) => a - b)

    const sum = leftSorted.reduce((acc, left, index) => {
        const diff = Math.abs(left - rightSorted[index])

        return acc + diff
    }, 0)

    console.log(sum)
}

main()