import { Day } from '../day'

class Day9 extends Day {
  constructor () {
    super(9)
  }

  solveForPartOne (input: string): string {
    const lines = input.split('\n')
      .filter(a => a)
      .map(line => line.split(' ').map(result => parseInt(result)))

    let result = 0

    lines.forEach(line => {
      const stack = this.getStack(line)

      let last = 0
      if (stack.length > 1) {
        last = stack[stack.length - 2][stack[stack.length - 1].length - 1]
        for (let x = stack.length - 3; x >= 0; x--) {
          last = stack[x][stack[x].length - 1] + last
        }
      } else {
        last = stack[0][stack[0].length - 1]
      }

      result = result + (line[line.length - 1] + last)
    })

    return result.toString()
  }

  solveForPartTwo (input: string): string {
    const lines = input.split('\n')
      .filter(a => a)
      .map(line => line.split(' ').map(result => parseInt(result)))

    let result = 0

    lines.forEach(line => {
      const stack = this.getStack(line)

      let last = 0
      if (stack.length > 1) {
        last = stack[stack.length - 2][0]
        for (let x = stack.length - 3; x >= 0; x--) {
          last = stack[x][0] - last
        }
      } else {
        last = stack[0][0]
      }

      result = result + (line[0] - last)
    })

    return result.toString()
  }

  calculateDifferences (input: number[]): number[] {
    const result: number[] = []
    for (let i = 0; i < input.length - 1; i++) {
      result.push(input[i + 1] - input[i])
    }
    return result
  }

  private getStack (line: number[]) {
    const stack: number[][] = []
    let diffs = []
    let target = line
    do {
      diffs = this.calculateDifferences(target)
      target = diffs
      stack.push(diffs)
    } while (diffs.reduce((total, number) => total + number, 0) !== 0)
    return stack
  }
}

export default new Day9()
