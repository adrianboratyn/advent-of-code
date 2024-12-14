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

    const result = zeros.reduce((acc, currentZero) => {
        const set = new Set()
        searchNextHeight(currentZero, grid, 1, set)

        return acc + set.size
    }, 0)

    console.log(result)
}

const searchNextHeight = (position, grid, searchFor, set) => {
    if (searchFor === 10) {
        set.add(`${position[0]}${position[1]}`)
        
        return
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

    correctDirections.forEach(currentDirection => searchNextHeight([currentDirection.x, currentDirection.y], grid, newSearchFor, set))
}

main()