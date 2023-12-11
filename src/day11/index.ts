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

    const galaxies = this.getGalaxies(map)
    const emptyRows = this.getEmptyRows(map, galaxies)
    const emptyColumns = this.getEmptyColumns(map, galaxies)

    const expandedGalaxies = this.expand(galaxies, emptyRows, emptyColumns, 2)

    return this.calculateTotalDistance(expandedGalaxies).toString()
  }

  solveForPartTwo (input: string): string {
    const map = this.getMap(input)

    const galaxies = this.getGalaxies(map)
    const emptyRows = this.getEmptyRows(map, galaxies)
    const emptyColumns = this.getEmptyColumns(map, galaxies)

    const expandedGalaxies = this.expand(galaxies, emptyRows, emptyColumns, 1_000_000)

    return this.calculateTotalDistance(expandedGalaxies).toString()
  }

  private calculateTotalDistance (expandedGalaxies: Coords[]) {
    let distances = 0
    expandedGalaxies.forEach((galaxy, index) => {
      for (let z = index + 1; z < expandedGalaxies.length; z++) {
        distances += this.getDistance(galaxy, expandedGalaxies[z])
      }
    })
    return distances
  }

  private getMap (input: string) {
    return input.split('\n').filter(a => a).map(line => line.split(''))
  }

  private getEmptyRows (map: string[][], galaxies: Coords[]) {
    const emptyRows: number[] = []

    const galaxyRows: number[] = galaxies.map(galaxy => galaxy.y)
    map.forEach((row, index) => {
      if (!galaxyRows.includes(index)) {
        emptyRows.push(index)
      }
    })
    return emptyRows
  }

  private getEmptyColumns (map: string[][], galaxies: Coords[]) {
    const emptyColumns: number[] = []

    const galaxyColumns: number[] = galaxies.map(galaxy => galaxy.x)
    const columns: number[] = Array(map[0].length).fill(1)

    columns.forEach((column, index) => {
      if (!galaxyColumns.includes(index)) {
        emptyColumns.push(index)
      }
    })

    return emptyColumns
  }

  private getGalaxies (map: string[][]) {
    const galaxies: Coords[] = []
    map.forEach((row, y) => {
      row.forEach((column, x) => {
        if (column === '#') {
          galaxies.push({ x, y })
        }
      })
    })

    return galaxies
  }

  private getDistance (a: Coords, b: Coords): number {
    return Math.abs(b.x - a.x) + Math.abs(b.y - a.y)
  }

  private expand (galaxies: Coords[], emptyRows: number[], emptyColumns: number[], by: number): Coords[] {
    let output: Coords[] = []
    // Expand the map. Go in reverse so we can keep the indices.
    for (const column of emptyColumns.reverse()) {
      output = galaxies.map(galaxy => {
        if (galaxy.x >= column) {
          galaxy.x += (by - 1)
        }

        return galaxy
      })
    }

    for (const row of emptyRows.reverse()) {
      output = output.map(galaxy => {
        if (galaxy.y >= row) {
          galaxy.y += (by - 1)
        }

        return galaxy
      })
    }

    return output
  }
}

export default new Day11()
