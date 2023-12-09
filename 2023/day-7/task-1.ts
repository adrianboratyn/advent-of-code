import { readInput } from 'utils'
import { formatInput, isFiveOfKind, isFourOfKind, isFullHouse, isHighCard, isOnePair, isThreeOfKind, isTwoPair } from './utils'

type Hand = {
    hand: string,
    bid: string
}

const getTotalWinning = (formatedInput: Array<Hand>) => {
    const CardLabel: Record<string, number> = {
        'A': 1,
        'K': 2,
        'Q': 3,
        'J': 4,
        'T': 5,
        '9': 6,
        '8': 7,
        '7': 8,
        '6': 9,
        '5': 10,
        '4': 11,
        '3': 12,
        '2': 13
    }

    const HandType: Record<string, number> = {
        'Five of a kind': 1,
        'Four of a kind': 2,
        'Full house': 3,
        'Three of a kind': 4,
        'Two pair': 5,
        'One pair': 6,
        'High card': 7
    }

    const handsWithType = formatedInput.map(line => ({ ...line, type: getHandType(line.hand) }))
    const handsSortedByStrength = handsWithType.sort((firstCard, secondCard) => {
        if (HandType[firstCard.type] === HandType[secondCard.type]) {
            const firstCardLabels = firstCard.hand.split('')
            const secondCardLabels = secondCard.hand.split('')

            for (let i=0; i<secondCardLabels.length; i++) {
                if (firstCardLabels[i] !== secondCardLabels[i]) {
                    return CardLabel[firstCardLabels[i]] - CardLabel[secondCardLabels[i]]
                }
            }            
        }

        return HandType[firstCard.type] - HandType[secondCard.type]
    })

    return handsSortedByStrength.reduce<number>((acc, currentHand, index) => acc + (Number(currentHand.bid) * (handsSortedByStrength.length - index)), 0)
}


const getHandType = (hand: string) => {
    if (isFiveOfKind(hand)) {
        return 'Five of a kind'
    }

    if (isFourOfKind(hand)) {
        return 'Four of a kind'
    }

    if (isFullHouse(hand)) {
        return 'Full house'
    }

    if (isThreeOfKind(hand)) {
        return 'Three of a kind'
    }

    if (isTwoPair(hand)) {
        return 'Two pair'
    }

    if (isOnePair(hand)) {
        return 'One pair'
    }

    if (isHighCard(hand)) {
        return 'High card'
    }

    return 'High card'
}

const main = async () => {
    const input = await readInput('day-7/input.txt')
    const formatedInput = formatInput(input)
    const result = getTotalWinning(formatedInput)
    
    console.log(result)
}

main()
