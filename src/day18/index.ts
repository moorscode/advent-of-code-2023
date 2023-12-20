import { Day } from '../day'

class Day18 extends Day {
  constructor () {
    super(18)
  }

  solveForPartOne (input: string): string {
    const data = input.split('\n').filter(a => a).map(line => {
      const result = line.match(/(\w+)\s(\d+)\s\((.*)\)/) || []
      return {
        move: result[1],
        steps: parseInt(result[2], 10),
        color: result[3]
      }
    })

    return this.calculate(data)
  }

  solveForPartTwo (input: string): string {
    const data = input.split('\n').filter(a => a).map(line => {
      const dir = ['R', 'D', 'L', 'U']
      const result = line.match(/(\w+)\s(\d+)\s\((.*)\)/) || []

      const distance = parseInt(result[3].substring(1, 6), 16)
      const direction = parseInt(result[3].substring(6, 7), 10)

      return {
        move: dir[direction],
        steps: distance
      }
    })

    return this.calculate(data)
  }

  private calculate (data: { move: string; steps: number }[]) {
    let x = 0
    let y = 0

    const coords: { x: number, y: number }[] = []

    data.forEach(row => {
      let dir = [0, 0]
      switch (row.move) {
        case 'U':
          dir = [-1, 0]
          break
        case 'D':
          dir = [1, 0]
          break
        case 'L':
          dir = [0, -1]
          break
        case 'R':
          dir = [0, 1]
          break
      }
      y += dir[0] * row.steps
      x += dir[1] * row.steps
      coords.push({ x, y })
    })

    let sum = 0
    for (let i = 0; i < coords.length - 1; i++) {
      sum += (coords[i].x * coords[i + 1].y) - (coords[i].y * coords[i + 1].x)
    }

    const length = data.reduce((total, row) => total + row.steps, 0)

    return Math.abs((sum / 2) + length / 2 + 1).toString()
  }
}

export default new Day18()
