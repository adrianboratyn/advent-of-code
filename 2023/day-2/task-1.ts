import { readInput } from  '../utils'
import { Game } from './types'
import { formatInput } from './utils'

const determinePossibleGames = (games: Array<Game>) => {
    const constraints = {
        red: 12,
        green: 13,
        blue: 14
    }

    const possibleGames = games.filter(game => {
        const validSets = game.sets.filter(set => {
            return set.red <= constraints.red
                && set.blue <= constraints.blue
                && set.green <= constraints.green
        })

        return validSets.length === game.sets.length
    })
    
    return possibleGames.reduce<number>((acc, currentGame) => acc + currentGame.gameId, 0)
}

const main = async () => {
    const input = await readInput('day-2/input.txt')
    const formattedInput = formatInput(input)
    const result = determinePossibleGames(formattedInput)

    console.log(result)    
}

main()
