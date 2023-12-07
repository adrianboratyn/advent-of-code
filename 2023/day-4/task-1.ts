import { readInput } from 'utils'

type Card = {
    winningNumbers: Array<number>,
    justNumbers: Array<number>
}

const parseInput = (input: string) =>
    input.split('\n').map((line: string) => ({
        winningNumbers: line.substring(line.indexOf(':') + 1, line.indexOf('|')).trim().split(' ').filter(el => el !== '').map(Number),
        justNumbers: line.substring(line.indexOf('|') + 1).trim().split(' ').filter(el => el !== '').map(Number)
    }))

const getWinninNumberSum = (cards: Array<Card>) => {
    const winningNumbers = cards.map(card => {
        const match = card.justNumbers.filter(num => card.winningNumbers.includes(num))

        return match.length === 0
            ? 0
            : Math.pow(2, match.length -1)
    })

    return winningNumbers.reduce<number>((acc, number) => acc + number, 0)
}

const main = async () => {
    const input = await readInput('day-4/input.txt')
    const parsedInput = parseInput(input)
    const result = getWinninNumberSum(parsedInput)

    console.log(result)
}

main()
