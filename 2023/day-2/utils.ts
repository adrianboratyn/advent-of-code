import { Game } from './types'

export const formatInput = (input: string): Array<Game> => {
    return input.split('\n').map(line => {
        const gameId = Number(line.substring(5, line.indexOf(':')))

        return {
            gameId,
            sets: line.substring(line.indexOf(':') + 2).split(';').map(game => {
                const red = Number(game.substring(game.indexOf('red') - 3, game.indexOf('red')).trim())
                const green = Number(game.substring(game.indexOf('green') - 3, game.indexOf('green')).trim())
                const blue = Number(game.substring(game.indexOf('blue') - 3, game.indexOf('blue')).trim())

                return {
                    red,
                    green,
                    blue
                }
            })
        }
    })
}
