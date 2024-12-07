import { readInput } from '../utils.js'

const main = async () => {
    const input = await readInput('day-5/input.txt')
    const [rulesInput, pageNumbersInput] = input.split('\n\n')

    const rules = rulesInput.split('\n').map(rule => {
        const [before, after] = rule.split('|')

        return { before, after }
    })

    const pageNumbers = pageNumbersInput.split('\n').map(line => line.split(','))

    const result = pageNumbers.reduce((acc, currentPage) => {
        if (!checkOrder(currentPage, rules)) {
            const ordered = fixOrder(currentPage, rules)
            const middleNumber = ordered[Math.floor(ordered.length / 2)]

            return acc + Number(middleNumber)
        }

        return acc
    }, 0)

    console.log(result)
}

const fixOrder = (pageNumbers, rules) =>
    pageNumbers.toSorted((second, first) => {
        if (rules.find(rule => rule.before === second && rule.after === first)) {
            return -1
        } else if (rules.find(rule => rule.after === second && rule.before === first)) {
            return 0
        } else {
            return 1
        }
    })

const checkOrder = (pageNumbers, rules) => {
    for (let i = 0; i < pageNumbers.length; i++) {
        // check only after
        if (i === 0) {
            const subArray = pageNumbers.slice(i + 1)
            const allAfter = subArray.every(pageNumber => rules.find(rule => rule.before === pageNumbers[i] && rule.after === pageNumber))

            if (!allAfter) {
                return false
            }
        }

        // check only before
        if (i === pageNumbers.length - 1) {
            const subArray = pageNumbers.slice(0, i)
            const allBefore = subArray.every(pageNumber => rules.find(rule => rule.after === pageNumbers[i] && rule.before === pageNumber))

            if (!allBefore) {
                return false
            }
        }

        // check before and after
        const beforeArray = pageNumbers.slice(0, i)
        const allBefore = beforeArray.every(pageNumber => rules.find(rule => rule.after === pageNumbers[i] && rule.before === pageNumber))

        if (!allBefore) {
            return false
        }

        const afterArray = pageNumbers.slice(i + 1)
        const allAfter = afterArray.every(pageNumber => rules.find(rule => rule.before === pageNumbers[i] && rule.after === pageNumber))

        if (!allAfter) {
            return false
        }
    }

    return true
}

main()