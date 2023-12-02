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

    const sum = values.reduce((sum, value): number => sum + value, 0)

    return sum.toString()
  }

  solveForPartTwo (input: string): string {
    const lines = input.split('\n').filter(line => line.length > 0)

    const subjects: string[] = Array(9).fill(0).map((element, index) => (index + 1).toString()).concat(['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'])

    const replacer = (input: number | string): number => {
      switch (input) {
        case 'one':
          return 1
        case 'two':
          return 2
        case 'three':
          return 3
        case 'four':
          return 4
        case 'five':
          return 5
        case 'six':
          return 6
        case 'seven':
          return 7
        case 'eight':
          return 8
        case 'nine':
          return 9
        default:
          return parseInt(input.toString())
      }
    }

    let sum = 0

    lines.map((value) => {
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
      return ''
    })

    return sum.toString()
  }
}

export default new Day1()
