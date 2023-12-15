import { Day } from '../day'

function memoize<Args extends unknown[], Result> (
  func: (...args: Args) => Result): (...args: Args) => Result {
  const stored = new Map<string, Result>()

  return (...args) => {
    const k = JSON.stringify(args)
    if (stored.has(k)) {
      return stored.get(k)!
    }
    const result = func(...args)
    stored.set(k, result)
    return result
  }
}

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
    const data = input.split('\n').filter(a => a).map((line, y) => line.split(''))

    const targetCycles = 1_000_000_000
    let cycles = 0
    let previousCycle = data

    const cycleMemoized = memoize(this.cycle)

    const seenCycles: string[] = []

    do {
      const cycleData = cycleMemoized(previousCycle)
      const flat = cycleData.map(a => a.join('')).join('\n')

      if (seenCycles.indexOf(flat) !== -1) {
        seenCycles.push(flat)
        break
      }

      seenCycles.push(flat)

      cycles++
      previousCycle = cycleData
    } while (cycles < targetCycles)

    const repeater = seenCycles[seenCycles.length - 1]
    const repeating = seenCycles.indexOf(repeater)

    const items = seenCycles.length - 1 - repeating
    const remainder = (targetCycles - repeating) % items

    const targetMap = seenCycles[repeating - 1 + remainder].split('\n').map(a => a.split(''))

    // Do a cycle of all sides.
    // Compare results with previous cycle.
    // Get remainder from total cycles - do number of cycles that remain - this should be the result.

    // console.log(previousCycle.map(r => r.join('')).join('\n'))

    let total = 0
    targetMap.forEach((line, y) => {
      line.forEach(char => {
        total += char === 'O' ? (previousCycle.length - y) : 0
      })
    })

    return total.toString()
  }

  private cycle (data: string[][]): string[][] {
    for (const dir of ['N', 'W', 'S', 'E'] as const) {
      let lines: string[][] = []

      if (dir === 'N' || dir === 'S') {
        // make lines top to bottom
        data.forEach((row, y) => row.forEach((col, x) => {
          lines[x] = lines[x] || []
          // @ts-ignore
          lines[x][y] = lines[x][y] || []
          lines[x][y] = col
        }))
      } else {
        lines = data
      }

      const rows = lines.map(row => row.join(''))
      rows.forEach((row, index) => {
        const sequence = [...row.matchAll(/([O.]+)/g)]
        sequence.forEach(result => {
          let replace: string = ''
          if (dir === 'W' || dir === 'N') {
            const s = result[0].split('')
            s.sort((a, b) => a === 'O' ? -1 : b === 'O' ? 1 : 0)
            replace = s.join('')
          }
          if (dir === 'E' || dir === 'S') {
            const s = result[0].split('')
            s.sort((a, b) => b === 'O' ? -1 : a === 'O' ? 1 : 0)
            replace = s.join('')
          }
          // @ts-ignore
          rows[index] = rows[index].substring(0, result.index) + replace + rows[index].substring(result.index + replace.length)
        })
      })

      // Flip array back
      let output: string[][] = []
      if (dir === 'N' || dir === 'S') {
        // make lines top to bottom
        rows.forEach((row, y) => row.split('').forEach((col, x) => {
          output[x] = output[x] || []
          // @ts-ignore
          output[x][y] = output[x][y] || []
          output[x][y] = col
        }))
      } else {
        output = rows.map(row => row.split(''))
      }

      data = output
    }

    return data
  }

  private equals (cycleData: string[][], previousCycle: string[][] | undefined): boolean {
    if (previousCycle === undefined) {
      return false
    }

    return JSON.stringify(cycleData) === JSON.stringify(previousCycle)
  }
}

export default new Day14()
