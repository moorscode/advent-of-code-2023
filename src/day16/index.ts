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
    let lights: Light[] = [{ x: 0, y: 0, dir: 'E' }]

    const touched: string[][][] = []
    const t = new Map()
    t.set('0,0', true)

    do {
      // For each light, step until reach out of bounds - remove light
      // On split, create new light
      lights.forEach((light, index) => {
        if (light.x < 0 || light.y < 0) {
          lights = lights.filter(a => a !== light)
          return
        }

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
          return
        }

        touched[light.y] = touched[light.y] || []
        touched[light.y][light.x] = touched[light.y][light.x] || []
        touched[light.y][light.x].push(light.dir)

        t.set(`${light.y},${light.x}`, true)
      })
    } while (lights.length > 0)

    return t.size.toString()
  }

  solveForPartTwo (input: string): string {
    return input
  }
}

export default new Day16()
