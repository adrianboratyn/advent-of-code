import { readInput, isNumeric } from '../utils'

const calculateCalibrationValue = (line: string) => {
    const digitValues = line
        .split('')
        .filter(char => isNumeric(char))

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
