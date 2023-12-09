import { Day } from '../day'

class Day9 extends Day {
  constructor () {
    super(9)
  }

  calculateDifferences (input: number[]): number[] {
    const result: number[] = []
    for (let i = 0; i < input.length - 1; i++) {
      result.push(input[i + 1] - input[i])
    }
    return result
  }

  solveForPartOne (input: string): string {
    const lines = input.split('\n')
      .filter(a => a)
      .map(line => line.split(' ').map(result => parseInt(result)))

    const finals: number[] = []

    lines.forEach(line => {
      const stack: number[][] = []
      let diffs = []
      let target = line
      do {
        diffs = this.calculateDifferences(target)
        target = diffs
        stack.push(diffs)
      } while (diffs.reduce((total, number) => total + number, 0) !== 0)

      let last = 0
      if (stack.length > 1) {
        last = stack[stack.length - 2][stack[stack.length - 1].length - 1]
        for (let x = stack.length - 3; x >= 0; x--) {
          const num = stack[x][stack[x].length - 1] + last
          stack[x].push(num)
          last = num
        }
      } else {
        last = stack[0][stack[0].length - 1]
      }

      finals.push(line[line.length - 1] + last)
    })

    return finals.reduce((total, number) => total + number, 0).toString()
  }

  solveForPartTwo (input: string): string {
    const lines = input.split('\n')
      .filter(a => a)
      .map(line => line.split(' ').map(result => parseInt(result)))

    const finals: number[] = []

    lines.forEach(line => {
      const stack: number[][] = []
      let diffs = []
      let target = line
      do {
        diffs = this.calculateDifferences(target)
        target = diffs
        stack.push(diffs)
      } while (diffs.reduce((total, number) => total + number, 0) !== 0)

      let last = 0
      if (stack.length > 1) {
        last = stack[stack.length - 2][0]
        for (let x = stack.length - 3; x >= 0; x--) {
          const num = stack[x][0] - last
          stack[x].unshift(num)
          last = num
        }
      } else {
        last = stack[0][0]
      }
      console.log(stack)

      finals.push(line[0] - last)
    })

    return finals.reduce((total, number) => total + number, 0).toString()
  }
}

export default new Day9()
