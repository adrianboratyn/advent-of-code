import { readInput } from 'utils'

// This one done based on this solution https://www.youtube.com/watch?v=NmxHw_bHhGM

type RangeData = {
    destinationRangeStart: number,
    sourceRangeStart: number,
    length: number
}

type SeedPair = {
    start: number,
    end: number
}

const formatInput = (input: string) => {
    const splittedInput = input.split('\n\n')
    const seedsLine = splittedInput[0]
    const seeds = seedsLine.substring(seedsLine.indexOf(':') + 2).split(' ').map(Number)

    const seedsPairs = seeds.reduce<Array<SeedPair>>((acc, seed, index) => {
        if (index % 2 === 0) {
            return [...acc, { start: seed , end: seed + seeds[index+1] }]
        }

        return acc
    }, [])

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
        seedsPairs,
        maps
    }
}

const getRangeMapping = (rangePairs: Array<SeedPair>, mappings: Array<RangeData>) => {
    const newPairs: Array<SeedPair> = []
    
    while(rangePairs.length > 0) {
        const lastRange = rangePairs.pop()

        if (lastRange) {
            const { start, end } = lastRange

        const mapping = mappings.find(mapping => {
            const overlapStart = Math.max(lastRange.start, mapping.sourceRangeStart)
            const overlapEnd = Math.min(end, mapping.sourceRangeStart + mapping.length)

            return overlapStart < overlapEnd
        })

        if (mapping) {
            const overlapStart = Math.max(start, mapping.sourceRangeStart)
            const overlapEnd = Math.min(end, mapping.sourceRangeStart + mapping.length)

            newPairs.push({
                start: overlapStart - mapping.sourceRangeStart + mapping.destinationRangeStart,
                end: overlapEnd - mapping.sourceRangeStart + mapping.destinationRangeStart
            })

            if (overlapStart > start) {
                rangePairs.push({ start, end: overlapStart })
            }

            if (end > overlapEnd) {
                rangePairs.push({ start: overlapEnd, end })
            }
        } else {
            newPairs.push({ start, end })
        }
        }
    }

    return newPairs
}

const main = async () => {
    const input = await readInput('day-5/input.txt')
    const { seedsPairs, maps } = formatInput(input)

    const soilNumbers = getRangeMapping(seedsPairs, maps[0])
    const fertilizerNumbers = getRangeMapping(soilNumbers, maps[1])
    const waterNumbers = getRangeMapping(fertilizerNumbers, maps[2])
    const lightNumbers = getRangeMapping(waterNumbers, maps[3])
    const temperatureNumbers = getRangeMapping(lightNumbers, maps[4])
    const humidityNumbers = getRangeMapping(temperatureNumbers, maps[5])
    const locationNumbers = getRangeMapping(humidityNumbers, maps[6])

    const resultSorted = locationNumbers.sort((loc1, loc2) => loc1.start - loc2.start)

    console.log(resultSorted[0].start)
}

main()
