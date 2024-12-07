import { readInput } from '../utils.js'

const main = async () => {
    const input = await readInput('day-3/input.txt')
    const mulNumbers = extractMulNumbers(input)

    const result = mulNumbers.reduce((acc, currentItem) => {
        const [left, right] = currentItem.split(',')

        return acc + Number(left) * Number(right)
    }, 0)

    console.log(result)
}

const extractMulNumbers = line => {
    const muls = []
    let canMatch = true
    const regex = /mul\([-0-9]+,[-0-9]+\)|do\(\)|don't\(\)/g
    const matches = line.match(regex)    

    for (let i = 0; i < matches.length; i++) {
        if (matches[i] === 'do()') {
            canMatch = true
        } else if (matches[i] === "don't()") {
            canMatch = false
        } else if (canMatch) {
            const mullNumbers = matches[i].substring(matches[i].indexOf('(') + 1, matches[i].indexOf(')'))

            muls.push(mullNumbers)
        }
    }

    return muls
}

main()
