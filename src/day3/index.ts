import { Day } from '../day'

type Position = {
  x: number;
  y: number;
}

class Day3 extends Day {
  private rows: string[] = []

  constructor () {
    super(3)
  }

  getSymbols (data: string[][]): Position[] {
    const symbols: Position[] = []

    data.forEach((row: string[], x: number) => {
      row.forEach((column: string, y: number) => {
        if (column.match(/[^\d.]/)) {
          symbols.push({ x, y })
        }
      })
    })

    return symbols
  }

  private hasNumberAt (position: Position): boolean {
    if (position.y < 0 || position.x < 0) {
      return false
    }

    if (position.x > this.rows.length - 1 || position.y > this.rows[0].length - 1) {
      return false
    }

    return this.rows[position.x][position.y].match(/\d/) !== null
  }

  private getNumberSurroundingSymbol (symbol: Position): number[] {
    const numbers: number[] = [];

    [-1, 0, 1].forEach(x => {
      [-1, 0, 1].forEach(y => {
        if (x === 0 && y === 0) return

        const position: Position = { x: symbol.x + x, y: symbol.y + y }
        if (this.hasNumberAt(position)) {
          try {
            numbers.push(this.getFullNumber(position))
          } catch (e) {
            // ignore.
          }
        }
      })
    })

    return numbers
  }

  // Finding the full number at a certain position.
  private getFullNumber (position: Position): number {
    const allNumbersOnTheRow = [...this.rows[position.x].matchAll(/\d+/g)]

    const numbers = allNumbersOnTheRow.map(result => {
      if (result.index === undefined) {
        return 0
      }

      const numberLength = result[0].toString().length
      // Find the numbers that overlap the given coordinate.
      if (result.index <= position.y && result.index + result[0].toString().length >= position.y) {
        // Remove number so we don't add it multiple times.
        const replacement = Array(numberLength).fill('.').join('')
        this.rows[position.x] = this.rows[position.x].substring(0, result.index) + replacement + this.rows[position.x].substring(result.index + numberLength)
        return parseInt(result[0], 10)
      }

      return 0
    }).filter(number => number > 0) // Remove zeros to be able to count found numbers.

    if (numbers.length === 0) {
      throw new Error('no number found')
    }

    return numbers[0]
  }

  solveForPartOne (input: string): string {
    // Put all characters in a map.
    this.rows = input.split('\n').filter(a => a)
    const data = this.rows.map(row => row.split(''))

    // Find all "symbols" (no dot or number).
    const symbols: Position[] = this.getSymbols(data)

    // Find all numbers adjacent to a symbol.
    let total = 0
    symbols.forEach((symbol: Position) => {
      const numbers: number[] = this.getNumberSurroundingSymbol(symbol)

      total += numbers.reduce((total, number) => total + number, 0)
    })

    return total.toString()
  }

  solveForPartTwo (input: string): string {
    // Put all characters in a map.
    this.rows = input.split('\n').filter(a => a)
    const data = this.rows.map(row => row.split(''))

    // Find all "symbols" (no dot or number).
    const symbols = this.getSymbols(data)

    // Find all numbers adjacent to a symbol.
    let total = 0
    symbols.forEach(symbol => {
      // We only care about the "*" symbols now - skip the rest.
      if (data[symbol.x][symbol.y] !== '*') {
        return
      }

      const numbers: number[] = this.getNumberSurroundingSymbol(symbol)
      if (numbers.length === 2) {
        total += numbers[0] * numbers[1]
      }
    })

    return total.toString()
  }
}

export default new Day3()
