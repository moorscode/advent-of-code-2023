import { Day } from '../day'

type Direction = 'N' | 'E' | 'S' | 'W'

type Light = {
  x: number;
  y: number;
  dir: Direction;
}

class Day16 extends Day {
  constructor () {
    super(16)
  }

  solveForPartOne (input: string): string {
    const data = input.split('\n').filter(a => a).map(line => line.split(''))

    return this.run(data, { x: 0, y: 0, dir: 'E' }).toString()
  }

  private run (data: string[][], light: Light) {
    let lights: Light[] = [light]

    const touched: string[][][] = []
    const t = new Map()

    do {
      // For each light, step until reach out of bounds - remove light
      // On split, create new light
      lights.forEach((light, index) => {
        if (light.x < 0 || light.y < 0 || light.y >= data.length || light.x >= data[0].length) {
          lights = lights.filter(a => a !== light)
          return
        }

        t.set(`${light.y},${light.x}`, true)

        switch (data[light.y][light.x]) {
          case '|':
            if (light.dir === 'E' || light.dir === 'W') {
              light.dir = 'S'
              lights.push({ x: light.x, y: light.y, dir: 'N' })
            }
            break
          case '-':
            if (light.dir === 'S' || light.dir === 'N') {
              light.dir = 'W'
              lights.push({ y: light.y, x: light.x, dir: 'E' })
            }
            break
          case '/':
            switch (light.dir) {
              case 'N':
                light.dir = 'E'
                break
              case 'E':
                light.dir = 'N'
                break
              case 'S':
                light.dir = 'W'
                break
              case 'W':
                light.dir = 'S'
                break
            }
            break
          case '\\':
            switch (light.dir) {
              case 'N':
                light.dir = 'W'
                break
              case 'E':
                light.dir = 'S'
                break
              case 'S':
                light.dir = 'E'
                break
              case 'W':
                light.dir = 'N'
                break
            }
            break
          case '.':
            break
        }

        switch (light.dir) {
          case 'N':
            light.y -= 1
            break
          case 'E':
            light.x += 1
            break
          case 'S':
            light.y += 1
            break
          case 'W':
            light.x -= 1
            break
        }

        // Out of bounds, remove light.
        if (!data[light.y] || !data[light.y][light.x]) {
          lights = lights.filter(a => a !== light)
          return
        }

        // If we've touched the tile already, avoid loops
        if (touched[light.y] && touched[light.y][light.x] && touched[light.y][light.x].includes(light.dir)) {
          lights = lights.filter(a => a !== light)
        }

        touched[light.y] = touched[light.y] || []
        touched[light.y][light.x] = touched[light.y][light.x] || []
        touched[light.y][light.x].push(light.dir)
      })
    } while (lights.length > 0)

    return t.size
  }

  solveForPartTwo (input: string): string {
    const data = input.split('\n').filter(a => a).map(line => line.split(''))

    let highest = 0
    for (let y = 0; y < data.length; y++) {
      highest = Math.max(highest, this.run(data, { x: 0, y, dir: 'E' }))
      highest = Math.max(highest, this.run(data, { x: data[0].length - 1, y, dir: 'W' }))
    }
    for (let x = 0; x < data[0].length; x++) {
      highest = Math.max(highest, this.run(data, { x, y: 0, dir: 'S' }))
      highest = Math.max(highest, this.run(data, { x, y: data.length - 1, dir: 'N' }))
    }

    return highest.toString()
  }
}

export default new Day16()
