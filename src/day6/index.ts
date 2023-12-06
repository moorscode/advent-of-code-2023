import { Day } from '../day'

class Day6 extends Day {
  constructor () {
    super(6)
  }

  solveForPartOne (input: string): string {
    const lines = input.split('\n').filter(a => a)

    const durations = [...lines[0].matchAll(/\d+/g)].map(result => parseInt(result[0]))
    const distances = [...lines[1].matchAll(/\d+/g)].map(result => parseInt(result[0]))

    const winners: number[] = []

    durations.forEach((duration, index) => {
      winners[index] = 0
      const distanceToBeat = distances[index]
      for (let d = 1; d < duration - 1; d++) {
        if (d * (duration - d) > distanceToBeat) {
          winners[index]++
        }
      }
    })

    return winners.reduce((total, number) => total * number, 1).toString()
  }

  solveForPartTwo (input: string): string {
    const lines = input.split('\n').filter(a => a)

    const durations = [...lines[0].matchAll(/\d+/g)].map(result => parseInt(result[0]))
    const distances = [...lines[1].matchAll(/\d+/g)].map(result => parseInt(result[0]))

    const winners: number[] = []

    durations.forEach((duration, index) => {
      winners[index] = 0
      const distanceToBeat = distances[index]
      for (let d = 1; d < duration - 1; d++) {
        if (d * (duration - d) > distanceToBeat) {
          winners[index]++
        }
      }
    })

    return winners.reduce((total, number) => total * number, 1).toString()
  }
}

export default new Day6()
