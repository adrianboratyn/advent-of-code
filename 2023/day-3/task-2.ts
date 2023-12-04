import { readInput, isNumeric } from '../utils'

type SymbolPosition = {
    xIndex: number,
    yIndex: number
}
type GridNumber = {
    value: string
    xIndex: number
    yStart: number
    yEnd: number
}

const getGearRationSum = (input: string) => {
    const gridNumbers: Array<GridNumber> = []
    const symbolPositions: Array<SymbolPosition> = []
    const grid = input.split('\n').map(line => line.split(''))

    grid.forEach((characters, xIndex) => {
        let numberValue = ''

        characters.forEach((character, yIndex) => {
            if (character === '*') {
                symbolPositions.push({
                    xIndex,
                    yIndex
                })
            }

            if (isNumeric(character)) {
                numberValue += character
            }

            if (isNumeric(character) && !isNumeric(characters[yIndex + 1])) {
                gridNumbers.push({
                    value: numberValue,
                    xIndex,
                    yStart: yIndex - (numberValue.length-1),
                    yEnd: yIndex
                })

                numberValue = ''
            }
        })
    })

    const gearRatios = symbolPositions.map(position => {
        const partNumbers = gridNumbers.filter(number => {
            return (position.xIndex === number.xIndex || position.xIndex - number.xIndex === 1 || position.xIndex - number.xIndex === -1)
                && (position.yIndex >= number.yStart - 1 && position.yIndex <= number.yEnd + 1)
        })

        return partNumbers.length === 2
            ? Number(partNumbers[0].value) * Number(partNumbers[1].value)
            : 0
    })

    return gearRatios.reduce((acc, currentRatio) => acc + currentRatio, 0)
}

const main = async () => {
    const input = await readInput('day-3/input.txt')
    const result = getGearRationSum(input)

    console.log(result)
}

main()
