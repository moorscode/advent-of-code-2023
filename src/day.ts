import fs from 'fs'

abstract class Day {
  id: number

  protected constructor (id: number) {
    this.id = id
  }

  async partOne (): Promise<{ result: string, timing: number }> {
    const content = await fs.promises.readFile(`./inputs/day${this.id}/part1.txt`)
    const start = Date.now()
    const result = this.solveForPartOne(content.toString())
    const end = Date.now()
    return {
      result,
      timing: end - start
    }
  }

  abstract solveForPartOne (input: string): string;

  async partTwo (): Promise<{ result: string, timing: number }> {
    const content = await fs.promises.readFile(`./inputs/day${this.id}/part2.txt`)

    const start = Date.now()
    const result = this.solveForPartTwo(content.toString())
    const end = Date.now()

    return {
      result,
      timing: end - start
    }
  }

  abstract solveForPartTwo (input: string): string;
}

export { Day }
