import { Day } from '../day'

type ConsoleTextColorType = 'foreground' | 'background';

const setConsoleColor = (hex: string, type: ConsoleTextColorType): string => {
  const red = parseInt(hex.substring(0, 2), 16)
  const green = parseInt(hex.substring(2, 2), 16)
  const blue = parseInt(hex.substring(4, 2), 16)
  const target = type === 'foreground' ? 38 : 48

  return `\x1b[${target};2;${red};${green};${blue}m`
}

const resetConsoleColors = (): string => {
  return '\x1b[0m'
}

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

    // const map = [['#ffffff']]
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
      // map[y] = map[y] || []
      for (let s = 0; s < row.steps; s++) {
        // map[y + (dir[0] * s)] = map[y + (dir[0] * s)] || []
        // map[y + (dir[0] * s)][x + (dir[1] * s)] = row.color
        coords.push({ x: x + (dir[1] * s), y: y + (dir[0] * s) })
      }
      y += dir[0] * row.steps
      x += dir[1] * row.steps
    })

    let sum = 0
    for (let i = 0; i < coords.length - 1; i++) {
      sum += (coords[i].x * coords[i + 1].y) - (coords[i].y * coords[i + 1].x)
    }

    const length = data.reduce((total, row) => total + row.steps, 0)

    return Math.abs((sum / 2) + length / 2 + 1).toString()
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
      // map[y] = map[y] || []
      for (let s = 0; s < row.steps; s++) {
        // map[y + (dir[0] * s)] = map[y + (dir[0] * s)] || []
        // map[y + (dir[0] * s)][x + (dir[1] * s)] = row.color
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
