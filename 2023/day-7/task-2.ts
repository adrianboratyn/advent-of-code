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
        'T': 4,
        '9': 5,
        '8': 6,
        '7': 7,
        '6': 8,
        '5': 9,
        '4': 10,
        '3': 11,
        '2': 12,
        'J': 13,
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

const findMostFrequentLabelInHand = (hand: string) => {
    const handWithCards = hand.split('').filter(label => label !== 'J')

    if (handWithCards.length === 0) {
        return 'A'
    }

    const labelsWithCount = handWithCards.map(label => {
        const count = handWithCards.filter(cardLabel => cardLabel === label).length

        return {
            label, count
        }
    })

    const maxCount = Math.max(...labelsWithCount.map(label => label.count))

    const [element] = labelsWithCount.filter(label => label.count === maxCount)

    return element.label
}

const getHandType = (hand: string) => {
    const mostFrequentLabel = findMostFrequentLabelInHand(hand)
    const updatedHand = hand.replaceAll('J', mostFrequentLabel)

    if (isFiveOfKind(updatedHand)) {
        return 'Five of a kind'
    }

    if (isFourOfKind(updatedHand)) {
        return 'Four of a kind'
    }

    if (isFullHouse(updatedHand)) {
        return 'Full house'
    }

    if (isThreeOfKind(updatedHand)) {
        return 'Three of a kind'
    }

    if (isTwoPair(updatedHand)) {
        return 'Two pair'
    }

    if (isOnePair(updatedHand)) {
        return 'One pair'
    }

    if (isHighCard(updatedHand)) {
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
