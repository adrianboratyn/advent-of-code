import { readInput } from '../utils.js'

const XMAS = 'XMAS'
const XMAS_BACKWORDS = 'SAMX'

const main = async () => {
    const input = await readInput('day-4/input.txt')
    const verticalLines = input.split('\n')
    let count = 0

    for (let i = 0; i < verticalLines.length; i++) {
        for (let j = 0; j < verticalLines[i].length; j++) {
            // check vertical word
            if (j <= verticalLines[i].length - 4) {
                const verticalWord = verticalLines[i].substring(j, j + 4)

                if (verticalWord.startsWith(XMAS) || verticalWord.startsWith(XMAS_BACKWORDS)) {
                    count++
                }
            }


            // check horizontal word - 4 letters
            if (i <= verticalLines.length - 4) {
                const horizontalWord = verticalLines[i][j] + verticalLines[i + 1][j] + verticalLines[i + 2][j] + verticalLines[i + 3][j]

                if (horizontalWord === XMAS || horizontalWord === XMAS_BACKWORDS) {
                    count++
                }
            }

            // check diagonal word to the right
            if (j <= verticalLines[i].length - 4 && i <= verticalLines.length - 4) {
                const diagonalWord = verticalLines[i][j] + verticalLines[i + 1][j + 1] + verticalLines[i + 2][j + 2] + verticalLines[i + 3][j + 3]

                if (diagonalWord === XMAS || diagonalWord === XMAS_BACKWORDS) {
                    count++
                }
            }

            // check diagonal word to the left
            if (j >= 3 && i <= verticalLines.length - 4) {
                const diagonalWord = verticalLines[i][j] + verticalLines[i + 1][j - 1] + verticalLines[i + 2][j - 2] + verticalLines[i + 3][j - 3]

                if (diagonalWord === XMAS || diagonalWord === XMAS_BACKWORDS) {
                    count++
                }
            }
        }
    }

    console.log(count)
}

main()