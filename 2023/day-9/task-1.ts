import { readInput } from 'utils'

const formatInput = (input: string) => {
    return input.split('\n').map(history => history.split(' ').map(Number))
}

const getHistorySequences = (history: Array<number>): any => {
    if (new Set(history).size === 1) {
        return []
    }

    const result = history.reduce<Array<number>>((acc, currentValue, index) => {
        if (index < history.length-1) {
            return [...acc, history[index+1] - currentValue]
        }

        return acc
    }, [])

    return [
        result,
        ...getHistorySequences(result)
    ]
}

const getNextValueForHistory = (history: Array<number>): any => {
    const sequences = [history, ...getHistorySequences(history)]
    const sequencesCount = sequences.length

    for (let i=sequencesCount-1; i>=0; i--) {
        if (i === sequencesCount-1) {
            sequences[i].push(sequences[i][sequences[i].length-1])
        } else {
            const lastElementFromPreviousSequence = sequences[i+1][sequences[i+1].length-1]
            sequences[i].push(lastElementFromPreviousSequence + sequences[i][sequences[i].length-1])
        }
    }

    return sequences[0][sequences[0].length-1]
}

const sumNextValuesInHistories = (input: Array<Array<number>>) => {
    return input.reduce<number>((acc, currentHistory) => acc + getNextValueForHistory(currentHistory), 0)
}

const main = async () => {
    const input = await readInput('day-9/input.txt')
    const formatedInput = formatInput(input)
    const result = sumNextValuesInHistories(formatedInput)

    console.log(result)
}

main()
