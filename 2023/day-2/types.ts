export type GameSet = {
    red: number
    green: number
    blue: number
}

export type Game = {
    gameId: number,
    sets: Array<GameSet>
}
