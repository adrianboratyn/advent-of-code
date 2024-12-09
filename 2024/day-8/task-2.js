import { readInput } from '../utils.js'

const main = async () => {
    const input = await readInput('day-8/input.txt')
    const grid = input.trim().split('\n').map(line => line.split(''))
    const map = new Map()

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] !== '.') {
                const value = map.get(grid[i][j])

                if (value === undefined) {
                    map.set(grid[i][j], [[i, j]])
                } else {
                    map.set(grid[i][j], [...value, [i, j]])
                }
            }
        }
    }

    const nodes = new Set()

    map.forEach((value, key) => {
        if (value.length > 1) {
            for (let i = 0; i < value.length; i++) {
                const [x, y] = value[i]
                nodes.add(`${x},${y}`)

                for (let j = i + 1; j < value.length; j++) {
                    const [x2, y2] = value[j]
                    nodes.add(`${x2},${y2}`)

                    const xDiff = x - x2
                    const yDiff = y - y2

                    for (let i = 1; i < grid.length; i++) {
                        const antinodeX = x + (xDiff * i)
                        const antinodeY = y + (yDiff * i)

                        if (grid[antinodeX]?.[antinodeY]) {
                            nodes.add(`${antinodeX},${antinodeY}`)
                        }
                    }

                    for (let i = 0; i < grid.length; i++) {
                        const antinodeX2 = x - xDiff * (2 + i)
                        const antinodeY2 = y - yDiff * (2 + i)

                        if (grid[antinodeX2]?.[antinodeY2]) {
                            nodes.add(`${antinodeX2},${antinodeY2}`)
                        }
                    }
                }
            }
        }
    })

    console.log(nodes.size)
}

main()