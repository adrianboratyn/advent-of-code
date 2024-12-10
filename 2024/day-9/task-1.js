import { readInput } from '../utils.js'

const main = async () => {
    const input = await readInput('day-9/input.txt')

    let inputArray = input
        .split('')
        .reduce((acc, currentChar, index) => {
            if (index % 2 === 0) {
                const temp = []

                for (let i = 0; i < Number(currentChar); i++) {
                    temp.push(index / 2)
                }

                return [...acc, ...temp]
            } else {
                const temp = []

                for (let i = 0; i < Number(currentChar); i++) {
                    temp.push('.')
                }

                return [...acc, ...temp]
            }
        }, [])

    while (true) {
        const lastChar = inputArray.at(-1)

        if (lastChar !== undefined && lastChar !== '.') {
            const indexOfDot = inputArray.indexOf('.')

            if (indexOfDot !== -1) {
                inputArray[indexOfDot] = inputArray.pop()
            } else {
                break
            }

        } else {
            inputArray.pop()
        }
    }

    const sum = inputArray.reduce((acc, currentItem, index) => acc + (Number(currentItem) * index), 0)

    console.log(sum, 'sum')
}

main()