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
    const grid = input.split('\n')
    const positions = new Set()
    let currentPosition = {}
    let currentDirection = 'up'

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] === '^') {
                currentPosition = { row: i, column: j }
                positions.add(`${currentPosition.column},${currentPosition.row}`)
            }
        }
    }

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
            break
        }

        const char = grid[nextPosition.row][nextPosition.column]

        if (char !== '#') {
            currentPosition.row = nextPosition.row
            currentPosition.column = nextPosition.column
            positions.add(`${currentPosition.column},${currentPosition.row}`)
        } else {
            currentDirection = nextDirection[currentDirection]
        }
    }

    console.log(positions.size, 'positions')
}

main()