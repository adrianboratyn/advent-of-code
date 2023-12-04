import { readInput, isNumeric } from '../utils'

const digitsToWords: Record<string, string> = {
    'one': '1',
    'two': '2',
    'three': '3',
    'four': '4',
    'five': '5',
    'six': '6',
    'seven': '7',
    'eight': '8',
    'nine': '9'
}

const calculateCalibrationValue = (line: string) => {
    const digitValues = line
        .split('')
        .reduce<Array<string>>((acc, character, index) => {
            if (isNumeric(character)) {
                return [...acc, character]
            }

            for (const key in digitsToWords) {
                if (line.substring(index).startsWith(key)) {
                    return [...acc, digitsToWords[key]]
                }
            }

            return acc
        }, [])
    
    return digitValues.length > 0
        ? Number(digitValues[0] + digitValues.slice(-1))
        : 0
}

const main = async () => {
    const input = await readInput('day-1/input.txt')

    const result = input
        .split('\n')
        .reduce<number>((acc, currentLine) => acc + calculateCalibrationValue(currentLine), 0)

    console.log(result)
}

main()
