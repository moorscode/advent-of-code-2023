import { Day } from '../day'
import { inflate } from 'node:zlib'

type Coords = {
  x: number;
  y: number;
}

type Pipe = {
  character: string
  connectTop?: string[]
  connectLeft?: string[]
  connectRight?: string[]
  connectBottom?: string[]
}

const Start: Pipe = {
  character: 'S'
}

const Vertical: Pipe = {
  character: '|',
  connectTop: ['F', '7', '|'],
  connectBottom: ['L', 'J', '|']
}

const Horizontal: Pipe = {
  character: '-',
  connectLeft: ['L', 'F', '-'],
  connectRight: ['7', 'J', '-']
}

const TopLeft: Pipe = {
  character: 'F',
  connectRight: ['-', '7', 'J'],
  connectBottom: ['|', 'L', 'J']
}

const TopRight: Pipe = {
  character: '7',
  connectLeft: ['-', 'F', 'L'],
  connectBottom: ['|', 'J', 'L']
}

const BottomLeft: Pipe = {
  character: 'L',
  connectRight: ['-', '7', 'J'],
  connectTop: ['|', '7', 'F']
}

const BottomRight: Pipe = {
  character: 'J',
  connectLeft: ['-', 'F', 'L'],
  connectTop: ['|', 'F', '7']
}

const Ground: Pipe = {
  character: '.'
}

type Tile = {
  pos: Coords,
  pipe: Pipe
}

const pipes: Pipe[] = [Start, TopLeft, BottomLeft, BottomRight, TopRight, Vertical, Horizontal, Ground]

class Day10 extends Day {
  constructor () {
    super(10)
  }

  characterToPipe (character: string): Pipe {
    return pipes.find(pipe => pipe.character === character) || Ground
  }

  private createMap (input: string): { map: Map<string, Pipe>, start: Coords } {
    let start: Coords = { x: 0, y: 0 }

    const map: Map<string, Pipe> = new Map()
    input.split('\n').filter(a => a).forEach((line, y) => {
      line.split('').forEach((character, x) => {
        const pos: Coords = { x, y }
        map.set(this.getKey(pos), this.characterToPipe(character))
        if (character === 'S') {
          start = pos
        }
      })
    })
    if (start.x === 0 && start.y === 0) {
      throw new Error('No start found' + input)
    }
    return { map, start }
  }

  solveForPartOne (input: string): string {
    const { map, start } = this.createMap(input)
    const loop = this.findLoop(start, map)

    return (loop.length / 2).toString()
  }

  solveForPartTwo (input: string): string {
    const { map, start } = this.createMap(input)
    const loop = this.findLoop(start, map)

    const perimeter = loop.length

    loop.push(start) // add start at the end
    let sum = 0
    for (let i = 0; i < loop.length - 1; i++) {
      sum += (loop[i].x * loop[i + 1].y) - (loop[i].y * loop[i + 1].x)
    }

    return (Math.abs(sum / 2) - (perimeter / 2) + 1).toString()
  }

  private findLoop (start: Coords, map: Map<string, Pipe>): Coords[] {
    let done = false

    const directions: Coords[] = []
    // determine the two directions we're going at.
    for (const pos of [{ x: -1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 0 }, { x: 0, y: -1 }] as Coords[]) {
      const key = this.getKey(this.coordsAdd(start, pos))
      if (map.has(key)) {
        const tile = map.get(key)
        if (tile?.character !== '.') {
          directions.push(pos)
        }
      }
    }

    const move: Coords[] = [start, start]

    const foundCoords: Coords[][] = [
      [this.coordsAdd(start, directions[0])],
      [this.coordsAdd(start, directions[1])]
    ]

    do {
      for (const index in move) {
        const currentTile: Coords = this.coordsAdd(move[index], directions[index])

        // Determine what the other 3 items are to figure out which can be followed.
        const nextTile = this.getConnectedPipe(currentTile, move[index], map)
        if (!nextTile) {
          return []
        }

        directions[index] = this.coordsSubtract(nextTile.pos, currentTile)

        foundCoords[index].push(nextTile.pos)

        const other = parseInt(index) === 0 ? 1 : 0
        if (foundCoords[other] && foundCoords[other].filter(a => this.coordsEqual(a, nextTile.pos)).length !== 0) {
          done = true
          break
        }

        // Set move to current position for next step.
        move[index] = currentTile
      }
    } while (!done)

    foundCoords[1].pop()
    return [start, ...foundCoords[0], ...foundCoords[1].reverse()]
  }

  private getConnectedPipe (currentTile: Coords, ignoreTile: Coords, map: Map<string, Pipe>): Tile | null {
    const current = map.get(this.getKey(currentTile))
    for (const pos of [{ x: -1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 0 }, { x: 0, y: -1 }] as Coords[]) {
      const target: Coords = this.coordsAdd(currentTile, pos)

      if (this.coordsEqual(target, ignoreTile)) {
        continue
      }

      const key = this.getKey(target)
      if (!map.has(key)) {
        continue
      }

      const test: Pipe | undefined = map.get(key)
      if (!test) {
        continue
      }

      if (pos.y === 1 && current?.connectBottom && current.connectBottom.includes(test.character)) {
        return {
          pos: target,
          pipe: test
        }
      }

      if (pos.y === -1 && current?.connectTop && current.connectTop.includes(test.character)) {
        return {
          pos: target,
          pipe: test
        }
      }

      if (pos.x === -1 && current?.connectLeft && current.connectLeft.includes(test.character)) {
        return {
          pos: target,
          pipe: test
        }
      }

      if (pos.x === 1 && current?.connectRight && current.connectRight.includes(test.character)) {
        return {
          pos: target,
          pipe: test
        }
      }
    }
    return null
  }

  getKey (coords: Coords): string {
    return `${coords.y},${coords.x}`
  }

  coordsAdd (a: Coords, b: Coords): Coords {
    return { x: a.x + b.x, y: a.y + b.y }
  }

  coordsEqual (a: Coords, b: Coords): boolean {
    return a.x === b.x && a.y === b.y
  }

  coordsSubtract (a: Coords, b: Coords): Coords {
    return { x: a.x - b.x, y: a.y - b.y }
  }
}

export default new Day10()
