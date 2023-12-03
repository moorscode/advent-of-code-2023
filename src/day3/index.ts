import { Day } from '../day'

type Coordinate = {
  x: number;
  y: number;
}

class Day3 extends Day {
  private data: string[] = []

  constructor () {
    super(3)
  }

  getSymbols (data: string[][]): Coordinate[] {
    const symbols: Coordinate[] = []

    data.forEach((row: string[], x: number) => {
      row.forEach((column: string, y: number) => {
        if (column.match(/[^\d.]/)) {
          symbols.push({ x, y })
        }
      })
    })

    return symbols
  }

  solveForPartOne (input: string): string {
    // Put all characters in a map.
    this.data = input.split('\n')
    const data = input.split('\n').map(row => row.split(''))

    // Find all "symbols" (no dot or number).
    // Find all numbers adjacent to a symbol.

    const symbols: Coordinate[] = this.getSymbols(data)

    let total = 0
    symbols.forEach((symbol: Coordinate) => {
      [-1, 0, 1].forEach(x => {
        [-1, 0, 1].forEach(y => {
          const position: Coordinate = { x: symbol.x + x, y: symbol.y + y }
          if (data[position.x][position.y].match(/\d/)) {
            total += this.getNumbers(position).reduce((total, number) => total + number, 0)
          }
        })
      })
    })

    return total.toString()
  }

  solveForPartTwo (input: string): string {
    // Put all characters in a map.
    this.data = input.split('\n')
    const data = input.split('\n').map(row => row.split(''))

    // Find all "symbols" (no dot or number).
    // Find all numbers adjacent to a symbol.

    const symbols = this.getSymbols(data)

    let total = 0
    symbols.forEach(symbol => {
      let numbers: number[] = []

      if (data[symbol.x][symbol.y] !== '*') {
        return
      }

      [-1, 0, 1].forEach(x => {
        [-1, 0, 1].forEach(y => {
          const position: Coordinate = { x: symbol.x + x, y: symbol.y + y }
          if (x === 0 && y === 0) return

          if (position.y >= 0 && position.x >= 0 && data[position.x] && data[position.x][position.y] && data[position.x][position.y].match(/\d/)) {
            numbers = numbers.concat(this.getNumbers(position))
          }
        })
      })

      if (numbers.length === 2) {
        total += numbers[0] * numbers[1]
      }
    })

    return total.toString()
  }

  private getNumbers (position: Coordinate): number[] {
    const allNumbersOnTheRow = [...this.data[position.x].matchAll(/\d+/g)]

    return allNumbersOnTheRow.map(result => {
      if (result.index === undefined) {
        return 0
      }

      const numberLength = result[0].toString().length
      // Find the numbers that overlap the given coordinate.
      if (result.index <= position.y && result.index + result[0].toString().length >= position.y) {
        // Remove number so we don't add it multiple times.
        const replacement = Array(numberLength).fill('.').join('')
        this.data[position.x] = this.data[position.x].substring(0, result.index) + replacement + this.data[position.x].substring(result.index + numberLength)
        return parseInt(result[0], 10)
      }

      return 0
    }).filter(number => number > 0) // Remove zeros to be able to count found numbers.
  }
}

export default new Day3()
