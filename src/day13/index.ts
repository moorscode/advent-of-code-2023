import { Day } from '../day'

class Day13 extends Day {
  constructor () {
    super(13)
  }

  solveForPartOne (input: string): string {
    const parts = input.split('\n\n').filter(a => a)

    let total = 0

    parts.forEach(part => {
      const lines = part.split('\n').filter(a => a)
      const map = lines.map(line => line.split(''))

      const h = this.getMirroredLine(lines, 0) * 100
      if (h > 0) {
        total += h
        return
      }

      const flipped: string[][] = []
      map.forEach((line, y) => {
        line.forEach((col, x) => {
          flipped[x] = flipped[x] || []
          flipped[x][y] = col
        })
      })
      const flattened = flipped.map(line => line.join(''))

      total += this.getMirroredLine(flattened, 0)
    })

    return total.toString()
  }

  solveForPartTwo (input: string): string {
    const parts = input.split('\n\n').filter(a => a)

    const total = parts.reduce((total, part) => {
      const lines = part.split('\n').filter(a => a)

      const alternative = this.change(part, 0, this.getMirroredLine(lines, 0)) * 100

      if (alternative > 0) {
        return total + alternative
      }

      // Mirror x&y
      const flipped: string[][] = []
      lines.forEach((line, y) => line.split('')
        .forEach((col, x) => {
          flipped[x] = flipped[x] || []
          flipped[x][y] = col
        })
      )

      const flattened = flipped.map(line => line.join(''))

      return total + this.change(flattened.join('\n'), 0, this.getMirroredLine(flattened, 0))
    }, 0)

    return total.toString()
  }

  private change (source: string, index: number, original: number): number {
    const lines = source.split('\n').filter(a => a)
    const length = lines.length * lines[0].length

    if (index >= length) {
      return 0
    }

    const line = Math.floor(index / lines[0].length)
    const offset = index % lines[0].length
    const now = lines[line][offset]
    const change = now === '.' ? '#' : '.'

    // Replace the character.
    lines[line] = lines[line].substring(0, offset) + change + lines[line].substring(offset + 1)

    const newResult = this.getMirroredLine(lines, original)
    if (newResult > 0 && newResult !== original) {
      return newResult
    }

    return this.change(source, index + 1, original)
  }

  getMirroredLine (lines: string[], skip: number): number {
    // eslint-disable-next-line no-labels
    lineLoop: for (let y = 1; y < lines.length; y++) {
      if (y === skip) {
        continue
      }
      // Matching lines.
      if (lines[y - 1] === lines[y]) {
        // See how many are mirrored.
        for (let z = 1; z < lines.length - y; z++) {
          if (y - z - 1 < 0) {
            break
          }
          if (lines[y + z] !== lines[y - z - 1]) {
            // eslint-disable-next-line no-labels
            continue lineLoop
          }
        }
        return y
      }
    }
    return 0
  }
}

export default new

Day13()
