import { Day } from '../day'

class Day2 extends Day {
  constructor () {
    super(2)
  }

  solveForPartOne (input: string): string {
    const games = input.split('\n').filter(a => a).map(line => {
      const a = line.split(': ')
      const sets = a[1].split('; ').map(set => {
        return set.split(', ').map(cube => {
          const details = cube.split(' ')
          return {
            amount: parseInt(details[0], 10),
            color: details[1]
          }
        }).reduce((combined, set) => {
          // @ts-ignore
          combined[set.color] = set.amount
          return combined
        }, { green: 0, red: 0, blue: 0 })
      })

      return {
        game: parseInt(a[0].replace('Game ', ''), 10),
        sets: sets.reduce((highest, set) => {
          highest.green = Math.max(highest.green, set.green)
          highest.red = Math.max(highest.red, set.red)
          highest.blue = Math.max(highest.blue, set.blue)
          return highest
        }, { green: 0, red: 0, blue: 0 })
      }
    })

    const result = games.reduce((total, game) => {
      if (game.sets.green <= 13 && game.sets.blue <= 14 && game.sets.red <= 12) {
        total += game.game
      }

      return total
    }, 0)

    return result.toString()
  }

  solveForPartTwo (input: string): string {
    const games = input.split('\n').filter(a => a).map(line => {
      const a = line.split(': ')
      const sets = a[1].split('; ').map(set => {
        return set.split(', ').map(cube => {
          const details = cube.split(' ')
          return {
            amount: parseInt(details[0], 10),
            color: details[1]
          }
        }).reduce((combined, set) => {
          // @ts-ignore
          combined[set.color] = set.amount
          return combined
        }, { green: 0, red: 0, blue: 0 })
      })

      return {
        game: parseInt(a[0].replace('Game ', ''), 10),
        sets: sets.reduce((highest, set) => {
          highest.green = Math.max(highest.green, set.green)
          highest.red = Math.max(highest.red, set.red)
          highest.blue = Math.max(highest.blue, set.blue)
          return highest
        }, { green: 0, red: 0, blue: 0 })
      }
    })

    const result = games.reduce((total, game) => {
      total += (game.sets.red * game.sets.blue * game.sets.green)
      return total
    }, 0)

    return result.toString()
  }
}

export default new Day2()
