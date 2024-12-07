import { readInput } from '../utils.js'

const main = async () => {
    const input = await readInput('day-1/input.txt')

    const [leftMap, rightMap] = input
        .split('\n')
        .reduce((acc, line) => {
            const [left, right] = line.split('   ')
            const leftValue = acc[0].get(Number(left))

            if (leftValue === undefined) {
                acc[0].set(Number(left), 1)
            } else {
                acc[0].set(Number(left), leftValue + 1)
            }

            const rightValue = acc[1].get(Number(right))

            if (rightValue === undefined) {
                acc[1].set(Number(right), 1)
            } else {
                acc[1].set(Number(right), rightValue + 1)
            }

            return acc
        }, [new Map(), new Map()])

    let sum = 0

    leftMap.forEach((value, key) => {
        const rightValue = rightMap.get(key)

        if (rightValue !== undefined) {
            sum += key * rightValue * value
        }
    })

    console.log(sum)
}

main()