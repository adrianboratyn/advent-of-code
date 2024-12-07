import { readInput } from '../utils.js'

const main = async () => {
    const input = await readInput('day-3/input.txt')
    const lines = input.split('\n')
    const mulNumbers = lines.flatMap(line => extractMulNumbers(line))

    const result = mulNumbers.reduce((acc, currentItem) => {
        const [left, right] = currentItem.split(',')

        return acc + Number(left) * Number(right)
    }, 0)

    console.log(result)
}

const extractMulNumbers = line => {
    const muls = []

    while (line.includes('mul(')) {
        if (line.startsWith('mul(')) {
            const indexOfSecondMull = line.indexOf('mul(', 1)
            const indexOfParanthesis = line.indexOf(')')
            let mul = ''

            if (indexOfParanthesis > indexOfSecondMull) {
                mul = line.substring(indexOfSecondMull, indexOfParanthesis + 1)
            } else {
                mul = line.substring(0, indexOfParanthesis + 1)
            }

            if (mul.length <= 12 && mul.includes(',')) { // mull(X,Y) when X, Y are 1-3 digit
                muls.push(mul.substring(mul.indexOf('(') + 1, mul.indexOf(')')))
            }

            line = line.slice(indexOfParanthesis + 1)
        } else {
            line = line.slice(1)
        }
    }

    return muls
}

main()