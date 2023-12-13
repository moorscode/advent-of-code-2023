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

type Line = {
  check: number[],
  line: string,
  test: string,
}

class Day12 extends Day {
  constructor () {
    super(12)
  }

  solveForPartOne (input: string): string {
    const data: Line[] = input.split('\n').filter(a => a).map(line => this.extractLine(line))

    let total = 0
    data.forEach(line => {
      total += this.walk(line)
    })

    return total.toString()
  }

  walk (line: Line): number {
    const firstUnknown = line.line.indexOf('?')
    if (firstUnknown === -1) {
      return this.isValid(line) ? 1 : 0
    }

    // Follow both paths.
    const newLine1 = Object.assign({}, line)
    newLine1.line = line.line.substring(0, firstUnknown) + '#' + line.line.substring(firstUnknown + 1)

    const newLine2 = Object.assign({}, line)
    newLine2.line = line.line.substring(0, firstUnknown) + '.' + line.line.substring(firstUnknown + 1)

    return this.walk(newLine1) + this.walk(newLine2)
  }

  solveForPartTwo (input: string): string {
    const data: Line[] = input.split('\n').filter(a => a).map(line => this.unfold(this.extractLine(line)))

    const walk = memoize((line: string, check: number[]): number => {
      // Just continue with next character.
      if (line[0] === '.') {
        return walk(line.substring(1), check)
      }

      if (line.length === 0) {
        // Nothing left, we're done
        if (check.length === 0) {
          return 1
        }
        return 0
      }

      // No checks left, see if we have any # left.
      if (check.length === 0) {
        return line.indexOf('#') === -1 ? 1 : 0
      }

      // If there is not enough space left for the required items.
      if (line.length < check.reduce((t, c) => t + c, 0) + (check.length - 1)) {
        return 0
      }

      // Start of a next group, check if we find a . in the group length.
      if (line[0] === '#') {
        const [t, ...remaining] = check

        // If the character after the amount is a '#' - it's no match.
        if (line[t] === '#') {
          return 0
        }

        // If it contains a dot, no match.
        if (line.substring(0, t).indexOf('.') !== -1) {
          return 0
        }

        // Continue after the group + space.
        return walk(line.substring(t + 1), remaining)
      }

      // This is a ? - test for both paths.
      return (walk(line.substring(1), check) + walk('#' + line.substring(1), check))
    })

    let total = 0
    data.forEach((line, index) => {
      const lineTotal = walk(line.line, line.check)
      total += lineTotal
    })

    return total.toString()
  }

  extractLine (line: string): Line {
    const [chars, checks] = line.split(' ')
    const checkList = checks.split(',').map(c => parseInt(c))

    const test = checkList.reduce((r, c, i) => {
      return r + `#{${c}}[^#]` + (i === checkList.length - 1 ? '*' : '+')
    }, '^[^#]*') + '$'

    return {
      line: chars,
      check: checkList,
      test
    }
  }

  isValid (line: Line): boolean {
    return line.line.match(new RegExp(line.test)) !== null
  }

  unfold (line: Line): Line {
    const newLine = line

    newLine.line = [newLine.line, newLine.line, newLine.line, newLine.line, newLine.line].join('?')
    newLine.check = newLine.check.concat(newLine.check, newLine.check, newLine.check, newLine.check)

    return newLine
  }
}

export default new Day12()
