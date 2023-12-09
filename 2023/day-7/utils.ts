export const formatInput = (input: string) => {
    return input.split('\n').map(line => {
        const [hand, bid] = line.split(' ')

        return {
            hand,
            bid
        }
    })
}

export const isHighCard = (hand: string) => hand.length === new Set(hand.split('')).size

export const isFiveOfKind = (hand: string) => new Set(hand.split('')).size === 1

export const isFourOfKind = (hand: string) => {
    const handCards = hand.split('')

    return handCards.some(currentValue => 
        handCards.filter(card => card === currentValue).length === 4)
}

export const isTwoPair = (hand: string) => {
    const pairs = findPairs(hand)

    return pairs.length === 2 && pairs[0] !== pairs[1]
} 

export const isOnePair = (hand: string) => {
    const pairs = findPairs(hand)

    return pairs.length === 1
}

export const isFullHouse = (hand: string) => {
    const threes = findThrees(hand)

    if (!threes) {
        return false
    }

    const cardsWithoutThrees = hand.split('').filter(card => card !== threes)

    return cardsWithoutThrees[0] === cardsWithoutThrees[1]
}

export const isThreeOfKind = (hand: string) => findThrees(hand) !== undefined

export const findThrees = (hand: string) => {
    const handCards = hand.split('')

    return handCards.find(currentValue => 
        handCards.filter(card => card === currentValue).length === 3)
}

export const findPairs = (hand: string) => {
    const handCards = hand.split('')

    return handCards.filter((currentValue, currentIndex) => 
        handCards.indexOf(currentValue) !== currentIndex)
}
