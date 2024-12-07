import { readInput } from '../utils.js'

const MAS = 'MAS'
const MAS_BACKWORDS = 'SAM'

const main = async () => {
    const input = await readInput('day-4/input.txt')
    const verticalLines = input.split('\n')
    let count = 0

    for (let i = 1; i < verticalLines.length - 1; i++) {
        for (let j = 1; j < verticalLines[i].length - 1; j++) {
            if (verticalLines[i][j] === 'A') {
                // diagonal to the right
                const toTheRightWord = verticalLines[i - 1][j - 1] + 'A' + verticalLines[i + 1][j + 1]

                // diagonal to the left
                const toTheLeftWord = verticalLines[i - 1][j + 1] + 'A' + verticalLines[i + 1][j - 1]

                if ((toTheRightWord === MAS || toTheRightWord === MAS_BACKWORDS) && (toTheLeftWord === MAS || toTheLeftWord === MAS_BACKWORDS)) {
                    count++
                }
            }
        }
    }

    console.log(count)
}

main()