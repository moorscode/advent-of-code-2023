import { Day } from '../day'

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

  solveForPartOne (input: string): string {
    const { map, start } = this.createMap(input)
    const loop = this.findLoop(start, map)

    return (loop.length / 2).toString()
  }

  private createMap (input: string) {
    let start: Coords = { x: 0, y: 0 }

    const map = new Map()
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

  solveForPartTwo (input: string): string {
    const { map, start } = this.createMap(input)
    const loop = this.findLoop(start, map)

    const perimeter = loop.length

    loop.push(start) // add start at the end
    let sum = 0
    for (let i = 0; i < loop.length - 1; i++) {
      sum += (loop[i].x * loop[i + 1].y) - (loop[i].y * loop[i + 1].x)
    }

    const area = sum / 2
    return (Math.abs(area) - (perimeter / 2) + 1).toString()
  }

  private findLoop (start: Coords, map: Map<string, Pipe>): Coords[] {
    const foundCoords: Coords[][] = [[], []]
    let done = false

    const directions: Coords[] = []
    // determine the two directions we're going at.
    for (const pos of [{ x: -1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 0 }, { x: 0, y: -1 }]) {
      const key = this.getKey({ x: start.x + pos.x, y: start.y + pos.y })
      if (map.has(key)) {
        const tile = map.get(key)
        if (tile?.character !== '.') {
          directions.push(pos)
        }
      }
    }

    const move: Coords[] = [start, start]

    foundCoords[0].push({ x: start.x + directions[0].x, y: start.y + directions[0].y })
    foundCoords[1].push({ x: start.x + directions[1].x, y: start.y + directions[1].y })

    do {
      for (const index in move) {
        const currentTile: Coords = {
          x: move[index].x + directions[index].x,
          y: move[index].y + directions[index].y
        }

        // Determine what the other 3 items are to figure out which can be followed.
        const nextTile = this.getConnectedPipe(currentTile, move[index], map)
        if (!nextTile) {
          return []
        }

        directions[index] = {
          x: nextTile.pos.x - currentTile.x,
          y: nextTile.pos.y - currentTile.y
        }

        foundCoords[index].push(nextTile.pos)

        const other = parseInt(index) === 0 ? 1 : 0
        if (foundCoords[other] && foundCoords[other].filter(a => a.x === nextTile.pos.x && a.y === nextTile.pos.y).length !== 0) {
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
    for (const pos of [{ x: -1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 0 }, { x: 0, y: -1 }]) {
      const target: Coords = {
        x: currentTile.x + pos.x,
        y: currentTile.y + pos.y
      }

      if (target.x === ignoreTile.x && target.y === ignoreTile.y) {
        continue
      }

      const key = this.getKey(target)
      if (!map.has(key)) {
        continue
      }

      // @ts-ignore
      const test: Pipe = map.get(key)
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
}

export default new Day10()
