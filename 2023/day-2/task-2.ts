import { readInput } from  '../utils'
import { Game, GameSet } from './types'
import { formatInput } from './utils'

const getResult = (games: Array<Game>) =>
    games.reduce<number>((acc, currentGame) => {
        const minimumSet = currentGame.sets.reduce<GameSet>((acc, currentSet) => {
            return {
                red: acc.red > currentSet.red ? acc.red : currentSet.red,
                green: acc.green > currentSet.green ? acc.green : currentSet.green,
                blue: acc.blue > currentSet.blue ? acc.blue : currentSet.blue
            }
        }, { red: 0, green: 0, blue: 0 })
        
        return acc + (minimumSet.red * minimumSet.green * minimumSet.blue)
    }, 0)

const main = async () => {
    const input = await readInput('day-2/input.txt')
    const formatedInput = formatInput(input)
    const result = getResult(formatedInput)

    console.log(result)    
}

main()
