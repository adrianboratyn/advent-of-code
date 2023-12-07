import { readInput } from 'utils'

type Card = {
    index: number,
    winningNumbers: Array<number>,
    justNumbers: Array<number>
}

type WinningNumberCard = {
    index: number,
    match: number,
    amount: number
}

const parseInput = (input: string) =>
    input.split('\n').map((line: string, index) => ({
        index: index + 1,
        winningNumbers: line.substring(line.indexOf(':') + 1, line.indexOf('|')).trim().split(' ').filter(el => el !== '').map(Number),
        justNumbers: line.substring(line.indexOf('|') + 1).trim().split(' ').filter(el => el !== '').map(Number)
    }))

const getResult = (cards: Array<Card>) => {
    let cardsWithWinningNumbers: Array<WinningNumberCard> = cards.map(card => {
        const matchCards = card.justNumbers.filter(num => card.winningNumbers.includes(num))

        return {
            index: card.index,
            match: matchCards.length,
            amount: 1
        }
    })

    cardsWithWinningNumbers.forEach(card => {
        if (card.match > 0) {
            cardsWithWinningNumbers = cardsWithWinningNumbers.reduce<Array<WinningNumberCard>>((acc, currentCard) => {
                if (currentCard.index > card.index && currentCard.index <= card.index + card.match) {
                    currentCard.amount = currentCard.amount + card.amount

                    return [...acc, currentCard]
                }

                return [...acc, currentCard]
            }, []) 
        }
    })

    return cardsWithWinningNumbers.reduce((acc, currentCard) => acc + currentCard.amount, 0)
}

const main = async () => {
    const input = await readInput('day-4/input.txt')
    const parsedInput = parseInput(input)
    const result = getResult(parsedInput)

    console.log(result)
}

main()
