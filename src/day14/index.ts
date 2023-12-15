import { Day } from '../day'

class Day14 extends Day {
  constructor () {
    super(14)
  }

  solveForPartOne (input: string): string {
    const map: Map<string, { type: string, height: number }> = new Map()
    let width = 0
    let height = 0
    input.split('\n').filter(a => a).forEach((line, y) => {
      height = Math.max(height, y)
      return line.split('').forEach((char, x) => {
        width = Math.max(width, x)
        map.set(`${y},${x}`, { type: char, height: 1 })
      })
    })

    for (let y = height; y > 0; y--) {
      for (let x = 0; x <= width; x++) {
        const key = `${y},${x}`
        if (map.has(key)) {
          const t = map.get(key) || { type: '.', height: 0 }
          if (t.type !== 'O') continue

          const n = map.get(`${y - 1},${x}`) || { type: '.', height: 0 }

          if (n.type === '.') {
            map.set(`${y - 1},${x}`, t)
            map.delete(`${y},${x}`)
            continue
          }

          if (n.type === 'O') {
            n.height += t.height
            map.set(`${y - 1},${x}`, n)
            map.delete(`${y},${x}`)
          }
        }
      }
    }

    let load = 0
    for (let y = 0; y <= height; y++) {
      for (let x = 0; x <= width; x++) {
        if (!map.has(`${y},${x}`)) {
          continue
        }

        const t = map.get(`${y},${x}`) || { type: '.', height: 1 }
        if (t.type === 'O') {
          for (let s = 0; s < t.height; s++) {
            load += height + 1 - y - s
          }
        }
      }
    }

    return load.toString()
  }

  solveForPartTwo (input: string): string {
    return input
  }
}

export default new Day14()
