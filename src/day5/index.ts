import { Day } from '../day'

type Map = {
  destinationRangeStart: number,
  sourceRangeStart: number,
  rangeLength: number
}

class Day5 extends Day {
  constructor () {
    super(5)
  }

  parseSection (section: string): Map[] {
    const lines = section.split('\n').filter(a => a)
    lines.shift()

    return lines.map(line => {
      // @ts-ignore
      const numbers = [...line.matchAll(/\d+/g)].map(number => parseInt(number))
      return {
        destinationRangeStart: numbers[0],
        sourceRangeStart: numbers[1],
        rangeLength: numbers[2]
      }
    })
  }

  convert (input: number, data: Map[]) {
    for (const map of data) {
      if (input >= map.sourceRangeStart && input <= map.sourceRangeStart + (map.rangeLength - 1)) {
        return (input - map.sourceRangeStart) + map.destinationRangeStart
      }
    }
    return input
  }

  solveForPartOne (input: string): string {
    const sectionsInFile = input.split('\n\n').filter(a => a)

    const seedLine = sectionsInFile.shift() || ''
    // @ts-ignore
    const seeds = [...seedLine.matchAll(/\d+/g)].map(number => parseInt(number))

    const sections = sectionsInFile.map(this.parseSection)

    const locations = seeds.map(seed => {
      let runningNumber = seed
      for (const maps of sections) {
        runningNumber = this.convert(runningNumber, maps)
      }

      return runningNumber
    })

    return Math.min(...locations).toString()
  }

  solveForPartTwo (input: string): string {
    const sectionsInFile = input.split('\n\n').filter(a => a)

    const seedLine = sectionsInFile.shift() || ''
    // @ts-ignore
    const seedsGroups = [...seedLine.matchAll(/\d+/g)].map(number => parseInt(number))
    const sections = sectionsInFile.map(this.parseSection)
    let lowest = Infinity

    // @ts-ignore
    let seeds: [[number, number]] = []
    for (let g = 0; g <= seedsGroups.length - 2; g += 2) {
      seeds.push([seedsGroups[g], seedsGroups[g] + seedsGroups[g + 1]])
    }

    for (const maps of sections) {
      // @ts-ignore
      const result: [[number, number]] = []

      while (seeds.length > 0) {
        // @ts-ignore
        const [starting, ending] = seeds.pop()

        let found = false
        for (const range of maps) {
          const overlapStart = Math.max(starting, range.sourceRangeStart)
          const overlapEnd = Math.min(ending, range.sourceRangeStart + range.rangeLength)

          if (overlapStart < overlapEnd) {
            result.push([overlapStart - range.sourceRangeStart + range.destinationRangeStart, overlapEnd - range.sourceRangeStart + range.destinationRangeStart])
            if (overlapStart > starting) {
              seeds.push([starting, overlapStart])
            }
            if (ending > overlapEnd) {
              seeds.push([overlapEnd, ending])
            }
            found = true
            break
          }
        }

        if (!found) result.push([starting, ending])
      }
      seeds = result
    }

    seeds.sort((a, b) => a[0] - b[0])

    return seeds[0][0].toString()

    // Old approach.. brute forced.
    // for (let g = 0; g <= seedsGroups.length - 2; g += 2) {
    //   let lowestForGroup = Infinity
    //   for (let s = seedsGroups[g]; s <= seedsGroups[g] + (seedsGroups[g + 1] - 1); s++) {
    //     let runningNumber = s
    //     for (const maps of sections) {
    //       runningNumber = this.convert(runningNumber, maps)
    //     }
    //     lowestForGroup = Math.min(lowestForGroup, runningNumber)
    //   }
    //   // console.log(g, lowestForGroup)
    //   lowest = Math.min(lowest, lowestForGroup)
    // }
    //
    // return lowest.toString()
  }
}

export default new Day5()
