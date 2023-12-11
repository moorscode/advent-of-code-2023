import { Day } from '../day'

type Coords = {
  x: number,
  y: number
}

class Day11 extends Day {
  constructor () {
    super(11)
  }

  solveForPartOne (input: string): string {
    const map = this.getMap(input)
    const columns = map[0].length
    const rows = map.length

    const galaxies = this.getGalaxies(rows, columns, map)
    const emptyRows = this.getEmptyRows(columns, rows, map)
    const emptyColumns = this.getEmptyColumns(columns, rows, map)

    const expandedGalaxies = this.expand(galaxies, emptyRows, emptyColumns, 2)

    let distances = 0
    for (let g = 0; g < expandedGalaxies.length - 1; g++) {
      for (let z = g + 1; z < expandedGalaxies.length; z++) {
        distances += this.getDistance(expandedGalaxies[g], expandedGalaxies[z])
      }
    }

    return distances.toString()
  }

  solveForPartTwo (input: string): string {
    const map = this.getMap(input)
    const rows = map.length
    const columns = map[0].length

    const galaxies = this.getGalaxies(rows, columns, map)
    const emptyRows = this.getEmptyRows(columns, rows, map)
    const emptyColumns = this.getEmptyColumns(columns, rows, map)

    const expandedGalaxies = this.expand(galaxies, emptyRows, emptyColumns, 1_000_000)

    let distances = 0
    for (let g = 0; g < expandedGalaxies.length - 1; g++) {
      for (let z = g + 1; z < expandedGalaxies.length; z++) {
        distances += this.getDistance(expandedGalaxies[g], expandedGalaxies[z])
      }
    }

    return distances.toString()
  }

  private getMap (input: string) {
    return input.split('\n').filter(a => a).map(line => line.split(''))
  }

  private getEmptyRows (columns: number, rows: number, map: string[][]) {
    const emptyRows: number[] = []

    for (let r = 0; r < rows; r++) {
      let empty = true
      for (let c = 0; c < columns; c++) {
        if (map[r][c] === '#') {
          empty = false
          break
        }
      }
      if (empty) {
        emptyRows.push(r)
      }
    }
    return emptyRows
  }

  private getEmptyColumns (columns: number, rows: number, map: string[][]) {
    const emptyColumns: number[] = []

    for (let c = 0; c < columns; c++) {
      let empty = true
      for (let r = 0; r < rows; r++) {
        if (map[r][c] === '#') {
          empty = false
          break
        }
      }
      if (empty) {
        emptyColumns.push(c)
      }
    }

    return emptyColumns
  }

  private getGalaxies (rows: number, columns: number, map: string[][]) {
    const galaxies: Coords[] = []
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < columns; c++) {
        if (map[r][c] === '#') {
          galaxies.push({ x: c, y: r })
        }
      }
    }
    return galaxies
  }

  private getDistance (a: Coords, b: Coords): number {
    return Math.abs(b.x - a.x) + Math.abs(b.y - a.y)
  }

  private expand (galaxies: Coords[], emptyRows: number[], emptyColumns: number[], by: number): Coords[] {
    let output: Coords[] = []
    // Expand the map. Go in reverse so we can keep the indices.
    for (const c of emptyColumns.reverse()) {
      output = galaxies.map(galaxy => {
        if (galaxy.x >= c) {
          galaxy.x += (by - 1)
        }

        return galaxy
      })
    }

    for (const r of emptyRows.reverse()) {
      output = output.map(galaxy => {
        if (galaxy.y >= r) {
          galaxy.y += (by - 1)
        }

        return galaxy
      })
    }

    return output
  }
}

export default new Day11()
