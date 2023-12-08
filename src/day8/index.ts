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
    const starts = Object.keys(maps).filter(key => key.substring(2) === 'A')

    let carry = 1
    starts.forEach(start => {
      let current = start
      let stepIndex = 0
      let steps = 0
      do {
        current = maps[current][instructions[stepIndex]]
        stepIndex = (stepIndex + 1) % instructions.length

        steps++
      } while (current.substring(2) !== 'Z')

      carry = this.lcm(carry, steps)
    })

    return carry.toString()
  }

  lcm (...arr: number[]) {
    const gcd = (x: number, y: number): number => (!y ? x : gcd(y, x % y))
    const _lcm = (x: number, y: number): number => (x * y) / gcd(x, y)
    return [...arr].reduce((a, b) => _lcm(a, b))
  }
}

export default new Day8()
