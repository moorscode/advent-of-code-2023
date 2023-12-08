import { Day } from '../day'

type Instruction = 'L' | 'R'

class Day8 extends Day {
  constructor () {
    super(8)
  }

  solveForPartOne (input: string): string {
    const [instructionsLine, rest] = input.split('\n\n')
    const parts = rest.split('\n').filter(a => a)

    // @ts-ignore
    const instructions: Instruction[] = instructionsLine.split('')

    const maps = parts.reduce((result: Record<string, { L: string, R: string }>, line) => {
      const elements = line.match(/(\w+) = \((\w+), (\w+)\)/) || []

      result[elements[1]] = {
        L: elements[2],
        R: elements[3]
      }
      return result
    }, {})

    let current = 'AAA'
    let stepIndex = 0
    let steps = 0
    do {
      current = maps[current][instructions[stepIndex]]
      stepIndex = (stepIndex + 1) % instructions.length

      steps++
    } while (current !== 'ZZZ')

    return steps.toString()
  }

  solveForPartTwo (input: string): string {
    const [instructionsLine, rest] = input.split('\n\n')
    const parts = rest.split('\n').filter(a => a)

    // @ts-ignore
    const instructions: Instruction[] = instructionsLine.split('')

    const maps = parts.reduce((result: Record<string, { L: string, R: string }>, line) => {
      const elements = line.match(/(\w+) = \((\w+), (\w+)\)/) || []

      result[elements[1]] = {
        L: elements[2],
        R: elements[3]
      }
      return result
    }, {})

    // Get starting pointers.
    const current = Object.keys(maps).filter(key => key.substring(2) === 'A')
    const endsWithA = current.length
    const numberOfInstructions = instructions.length

    // Count the number of steps we're doing.
    let steps = 0
    // Keep track of the instructions.
    let stepIndex = 0
    let endsWithZ = 0
    do {
      // Move all pointers up one step.
      for (const index in current) {
        current[index] = maps[current[index]][instructions[stepIndex]]
      }
      stepIndex = (stepIndex + 1) % numberOfInstructions // Loop back around.

      // Count the steps.
      steps++

      // See where we are at.
      endsWithZ = current.filter(identifier => identifier.substring(2) === 'Z').length

      // Loop until we have the same number of items ending on Z as there are running pointers.
    } while (endsWithZ !== endsWithA)

    return steps.toString()
  }
}

export default new Day8()
