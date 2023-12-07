import { readInput } from 'utils'

type RangeData = {
    destinationRangeStart: number,
    sourceRangeStart: number,
    length: number
}

const formatInput = (input: string) => {
    const splittedInput = input.split('\n\n')
    const seedsLine = splittedInput[0]
    const seeds = seedsLine.substring(seedsLine.indexOf(':') + 2).split(' ')

    const maps = splittedInput.slice(1).map(line => {
        const rows = line.split('\n')

        return rows.slice(1).map(row => {
            const rangeData = row.split(' ')

            return {
                destinationRangeStart: Number(rangeData[0]),
                sourceRangeStart: Number(rangeData[1]),
                length: Number(rangeData[2])
            }
        })
    })
    
    return {
        seeds,
        maps
    }
}

const getRangeMapping = (seeds: Array<string>, rangesData: Array<RangeData>) => {
    const map = new Map<string, string>()

    seeds.forEach(seed => {
        if (!map.get(seed)) {
            const matchingRange = rangesData.find(range => {
                return Number(seed) >= range.sourceRangeStart && Number(seed) <= range.sourceRangeStart + range.length - 1
            })
    
            if (matchingRange) {
                map.set(seed, String(Number(seed) + matchingRange.destinationRangeStart - matchingRange.sourceRangeStart))
            }
    
            if (!matchingRange) {
                map.set(seed, seed)
            }
        }
    })

    return seeds.map(seed => map.get(seed)) as Array<string>
}

const findLowestLocation = (seedNumbers: Array<string>, maps: Array<Array<RangeData>>) => {
    const soilNumbers = getRangeMapping(seedNumbers, maps[0])
    const fertilizerNumbers = getRangeMapping(soilNumbers, maps[1])
    const waterNumbers = getRangeMapping(fertilizerNumbers, maps[2])
    const lightNumbers = getRangeMapping(waterNumbers, maps[3])
    const temperatureNumbers = getRangeMapping(lightNumbers, maps[4])
    const humidityNumbers = getRangeMapping(temperatureNumbers, maps[5])
    const locationNumbers = getRangeMapping(humidityNumbers, maps[6])

    return Math.min(...locationNumbers.map(Number))
}

const main = async () => {
    const input = await readInput('day-5/input.txt')
    const { seeds, maps } = formatInput(input)
    
    const result = findLowestLocation(seeds, maps)

    console.log(result)
}

main()
