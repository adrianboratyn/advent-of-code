import { readInput } from '../utils.js'

const main = async () => {
    const input = await readInput('day-10/input.txt')
    const grid = input.split('\n').map(line => line.split(''))
    const zeros = []

    for (let x = 0; x < grid.length; x++) {
        for (let y = 0; y < grid[x].length; y++) {
            if (grid[x][y] === '0') {
                zeros.push([x, y])
            }
        }
    }

    const result = zeros.reduce((acc, currentZero) => acc + searchNextHeight(currentZero, grid, 1), 0)

    console.log(result)
}

const searchNextHeight = (position, grid, searchFor) => {
    if (searchFor === 10) {
        return 1
    }

    const [x, y] = position

    const directions = [
        { value: grid[x]?.[y - 1], x, y: y - 1 },
        { value: grid[x]?.[y + 1], x, y: y + 1 },
        { value: grid[x - 1]?.[y], x: x - 1, y },
        { value: grid[x + 1]?.[y], x: x + 1, y }
    ]

    const correctDirections = directions.filter(direction => direction.value == searchFor)
    const newSearchFor = searchFor + 1

    return correctDirections.reduce((acc, currentDirection) => acc + searchNextHeight([currentDirection.x, currentDirection.y], grid, newSearchFor), 0)
}

main()