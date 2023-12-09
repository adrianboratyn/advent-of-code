import { readInput } from '../utils'

type Race = {
    time: number,
    record: number
}

const formatInput = (input: string) => {
    const lines = input.split('\n')
    const times = lines[0].substring(lines[0].indexOf(':') + 1).trim().split(' ').filter(time => time !== '').map(Number)
    const records = lines[1].substring(lines[1].indexOf(':') + 1).trim().split(' ').filter(record => record !== '').map(Number)

    return times.map((time, index) => ({
        time,
        record: records[index]
    }))
}

const countNewRaceRecords = (time: number, record: number) => {
    const results = []

    for (let i=1; i<time; i++) {
        const distance = (time - i) * i

        results.push({ time: i, distance })
    }

    return results.filter(result => result.distance > record).length
}

const getRaceRecordsMultiplied = (races: Array<Race>) => {
    return races.reduce<number>((acc, { time, record }) => acc * countNewRaceRecords(time, record), 1)
}

const main = async () => {
    const input = await readInput('day-6/input.txt')
    const formatedInput = formatInput(input)
    const result = getRaceRecordsMultiplied(formatedInput)

    console.log(result)
}

main()
