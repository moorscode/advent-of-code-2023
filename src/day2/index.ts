import { Day } from '../day'

type Set = { amount: number, color: 'red' | 'blue' | 'green' }
type Cubes = { green: number, red: number, blue: number };
type Game = { game: number, topCubes: Cubes }

class Day2 extends Day {
  constructor () {
    super(2)
  }

  parseInput (input: string): Game[] {
    return input.split('\n').filter(a => a).map(line => {
      const a = line.split(': ')
      const sets: Cubes[] = a[1].split('; ').map(set => {
        return set.split(', ')
          .map(cube => {
            const details = cube.split(' ')
            return {
              amount: parseInt(details[0], 10),
              color: details[1]
            } as Set
          })
          .reduce((combined: Cubes, set: Set) => {
            // @ts-ignore
            combined[set.color] = set.amount
            return combined
          }, { green: 0, red: 0, blue: 0 })
      })

      return {
        game: parseInt(a[0].replace('Game ', ''), 10),
        topCubes: sets.reduce((highest, set) => {
          highest.green = Math.max(highest.green, set.green)
          highest.red = Math.max(highest.red, set.red)
          highest.blue = Math.max(highest.blue, set.blue)
          return highest
        }, { green: 0, red: 0, blue: 0 })
      }
    })
  }

  solveForPartOne (input: string): string {
    const games = this.parseInput(input)

    const result = games.reduce((total, game) => {
      if (game.topCubes.green <= 13 && game.topCubes.blue <= 14 && game.topCubes.red <= 12) {
        total += game.game
      }

      return total
    }, 0)

    return result.toString()
  }

  solveForPartTwo (input: string): string {
    const games = this.parseInput(input)

    const result = games.reduce((total, game) => {
      total += (game.topCubes.red * game.topCubes.blue * game.topCubes.green)
      return total
    }, 0)

    return result.toString()
  }
}

export default new Day2()
