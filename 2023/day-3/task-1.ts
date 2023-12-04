import { readInput, isNumeric } from '../utils'

type GridNumber = {
    value: string
    isPartNumber: boolean
}

const getCharByPosition = (x: number, y: number, grid: Array<Array<string>>) => {
    const maxX = grid.length - 1
    const maxY = grid[0].length - 1

    if (y > maxY || x > maxX || y < 0 || x < 0) {
        return undefined
    }

    return grid[x][y]
}

const getNonPartNumbers = (input: string) => {
    const numbersInGrid: Array<GridNumber> = []
    const grid = input.split('\n').map(line => line.split(''))

    grid.forEach((characters, xIndex) => {
        const number: GridNumber = {
            value: '',
            isPartNumber: true
        }

        characters.forEach((character, yIndex) => {
            if (isNumeric(character)) {
                const neighbors: Array<string | undefined> = [
                    getCharByPosition(xIndex, yIndex-1, grid), // left
                    getCharByPosition(xIndex, yIndex+1, grid), // right
                    getCharByPosition(xIndex-1, yIndex, grid), // top
                    getCharByPosition(xIndex+1, yIndex, grid), // bottom
                    getCharByPosition(xIndex-1, yIndex-1, grid), // topLeft
                    getCharByPosition(xIndex-1, yIndex+1, grid), // topRight
                    getCharByPosition(xIndex+1, yIndex+1, grid), // bottomRight
                    getCharByPosition(xIndex+1, yIndex-1, grid) // bottomLeft
                ]
            
                const hasNotSymbolsAround = neighbors.every(element => !element || element === '.' || isNumeric(element))
                
                number.value += character
                number.isPartNumber = !hasNotSymbolsAround ? hasNotSymbolsAround : number.isPartNumber
            }

            if (isNumeric(character) && !isNumeric(characters[yIndex + 1])) {
                numbersInGrid.push({
                    value: number.value,
                    isPartNumber: number.isPartNumber
                })

                number.value = ''
                number.isPartNumber = true
            }
        })        
    })

    return numbersInGrid.reduce((acc, currentNumber) => {
        if (currentNumber.isPartNumber === false) {
            return acc + Number(currentNumber.value)
        }
        
        return acc
    }, 0)
}

const main = async () => {
    const input = await readInput('day-3/input.txt')
    const result = getNonPartNumbers(input)

    console.log(result)
}

main()
