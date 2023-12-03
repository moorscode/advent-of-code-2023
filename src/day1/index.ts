import { Day } from '../day'

class Day1 extends Day {
  constructor () {
    super(1)
  }

  solveForPartOne (input: string): string {
    const lines = input.split('\n').filter(line => line)

    const values = lines.map((value) => {
      const numbers = [...value.matchAll(/\d/g)]

      if (numbers.length === 1) {
        return parseInt(numbers[0] + '' + numbers[0])
      }

      return parseInt(numbers[0] + '' + numbers[numbers.length - 1])
    })

    return values.reduce((sum, value): number => sum + value, 0).toString()
  }

  solveForPartTwo (input: string): string {
    const numberNames = ['---', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
    const lines = input.split('\n').filter(line => line.length > 0)

    const subjects: string[] = Array(9).fill(0).map((element, index) => (index + 1).toString()).concat(numberNames)

    const replacer = (input: number | string): number => {
      if (typeof input === 'string') {
        const index = numberNames.indexOf(input)
        if (index > 0) {
          return index
        }
      }

      return parseInt(input.toString())
    }

    let sum = 0

    lines.forEach((value) => {
      let firstNumber = ''
      subjects.reduce((lowestIndex, subject) => {
        const index = value.indexOf(subject)
        if (index === -1 || index > lowestIndex) {
          return lowestIndex
        }

        firstNumber = subject
        return index
      }, value.length)

      let lastNumber = ''
      subjects.reduce((highestIndex, subject) => {
        const index = value.lastIndexOf(subject)
        if (index === -1 || index < highestIndex) {
          return highestIndex
        }

        lastNumber = subject
        return index
      }, -1)

      lastNumber = lastNumber || firstNumber

      const first = replacer(firstNumber)
      const last = replacer(lastNumber)

      sum += parseInt(first.toString() + last.toString())
    })

    return sum.toString()
  }
}

export default new Day1()
