import { readInput } from '../utils.js'

const directionMove = {
    up: {
        row: -1,
        column: 0
    },
    down: {
        row: 1,
        column: 0
    },
    left: {
        row: 0,
        column: -1
    },
    right: {
        row: 0,
        column: 1
    }
}

const nextDirection = {
    up: 'right',
    right: 'down',
    down: 'left',
    left: 'up'
}

const main = async () => {
    const input = await readInput('day-6/input.txt')
    let grid = input.split('\n').map(line => line.split(''))
    let currentPosition = {}
    let startingPosition = {}
    let currentDirection = 'up'

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] === '^') {
                currentPosition = { row: i, column: j }
                startingPosition = { row: i, column: j }
                grid[i][j] = '.'
            }
        }
    }

    let answer = 0

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] === '.') {
                grid[i][j] = '#'

                if (findCycle(currentPosition, currentDirection, grid)) {
                    answer++
                }
                
                currentDirection = 'up'
                currentPosition.row = startingPosition.row
                currentPosition.column = startingPosition.column

                grid[i][j] = '.'
            }
        }
    }

    console.log(answer)
}

const findCycle = (currentPosition, currentDirection, grid) => {
    const positions = new Set()
    const columnsCount = grid[0].length
    const rowsCount = grid.length

    while (true) {
        const nextPosition = {
            row: currentPosition.row + directionMove[currentDirection].row,
            column: currentPosition.column + directionMove[currentDirection].column
        }

        if (nextPosition.column > columnsCount - 1
            || nextPosition.row > rowsCount - 1
            || nextPosition.column < 0
            || nextPosition.row < 0
        ) {
            return false
        }

        const char = grid[nextPosition.row][nextPosition.column]

        if (char !== '#') {
            currentPosition.row = nextPosition.row
            currentPosition.column = nextPosition.column
        } else {
            currentDirection = nextDirection[currentDirection]

            if (positions.has(`${currentPosition.column},${currentPosition.row},${currentDirection}`)) {
                return true
            } else {
                positions.add(`${currentPosition.column},${currentPosition.row},${currentDirection}`)
            }
        }
    }
}

main()