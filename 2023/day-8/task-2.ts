import { readInput } from 'utils'

// This one done based on this solution https://www.youtube.com/watch?v=_nnxLcrwO_U

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

const gcd = (firstNumber: number, secondNumber: number): number => {
    if (secondNumber) {
        return gcd(secondNumber, firstNumber % secondNumber)
    }

    return Math.abs(firstNumber)
}

const main = async () => {
    const input = await readInput('day-8/input.txt')
    const { nodes, instructions } = formatInput(input)

    const aNodes = nodes.filter(node => node.name.endsWith('A'))
    
    const cyclesLength = aNodes.map(node => {
        let currentNodeName = node.name
        let currentInstructionIndex = 0
        let stepsCount = 0
        let steps = []
        let zNodes = []
        let firstZNode = ''

        while (true) {
            while (!currentNodeName.endsWith('Z') || stepsCount === 0) {
                if (currentInstructionIndex === instructions.length) {
                    currentInstructionIndex = 0
                }
        
                const [node] = nodes.filter(node => node.name === currentNodeName)
                const step = instructions[currentInstructionIndex]
                currentNodeName = step === 'L' ? node.left : node.right
    
                currentInstructionIndex++
                stepsCount++
            }

            steps.push(stepsCount)
            zNodes.push(currentNodeName)

            if (firstZNode === '') {
                firstZNode = currentNodeName
                stepsCount = 0
            } else if (currentNodeName == firstZNode) {
                break 
            }
        }

        return steps[1]
    })

    let [lcm, ...cycles] = cyclesLength

    cycles.forEach(cycle => {
        lcm = (lcm * cycle) / gcd(lcm, cycle)
    })

    console.log(lcm)
}

main()
