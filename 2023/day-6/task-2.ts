import { readInput } from '../utils'

const formatInput = (input: string) => {
    const lines = input.split('\n')
    const time = Number(lines[0].substring(lines[0].indexOf(':') + 1).replaceAll(' ', ''))
    const record = Number(lines[1].substring(lines[1].indexOf(':') + 1).replaceAll(' ', ''))

    return {
        time,
        record
    }
}

const countNewRaceRecords = (time: number, record: number) => {
    const results = []

    for (let i=1; i<time; i++) {
        const distance = (time - i) * i

        results.push({ time: i, distance })
    }

    return results.filter(result => result.distance > record).length
}

const main = async () => {
    const input = await readInput('day-6/input.txt')
    const { time, record } = formatInput(input)
    const result = countNewRaceRecords(time, record)

    console.log(result)
}

main()
