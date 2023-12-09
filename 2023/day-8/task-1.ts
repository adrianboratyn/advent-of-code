import { readInput } from 'utils'

const formatInput = (input: string) => {
    const inputArray = input.split('\n')
    const instructions = inputArray[0]

    const nodes = inputArray.slice(2).map(line => ({
        name: line.substring(0, line.indexOf('=') -1),
        left: line.substring(line.indexOf('(') + 1, line.indexOf(',')),
        right: line.substring(line.indexOf(',') + 2, line.indexOf(')'))
    }))

    return {
        nodes,
        instructions
    }
}

const main = async () => {
    const input = await readInput('day-8/input.txt')
    const { nodes, instructions } = formatInput(input)

    let currentNodeName = 'AAA'
    let currentInstructionIndex = 0
    let stepsCount = 0

    while (currentNodeName !== 'ZZZ') {
        if (currentInstructionIndex === instructions.length) {
            currentInstructionIndex = 0
        }

        const [node] = nodes.filter(node => node.name === currentNodeName)
        const step = instructions[currentInstructionIndex]
        currentNodeName = step === 'L' ? node.left : node.right

        currentInstructionIndex++
        stepsCount++
    }

    console.log(stepsCount)
}

main()
