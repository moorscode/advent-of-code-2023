import day1 from './index'

describe('On Day 1', () => {
  it('part1 is identity function', () => {
    expect(day1.solveForPartOne('1abc2\n' +
      'pqr3stu8vwx\n' +
      'a1b2c3d4e5f\n' +
      'treb7uchet\n')).toBe('142')

    expect(day1.solveForPartTwo('two1nine\n' +
      'eightwothree\n' +
      'abcone2threexyz\n' +
      'xtwone3four\n' +
      '4nineeightseven2\n' +
      'zoneight234\n' +
      '7pqrstsixteen\n')).toBe('281')

    expect(day1.solveForPartTwo('eightwothree\n')).toBe('83')
    expect(day1.solveForPartTwo('fourtwo15nine1\n')).toBe('41')
    expect(day1.solveForPartTwo('gtlbhbjgkrb5sixfivefivetwosix\n')).toBe('56')
    expect(day1.solveForPartTwo('5sevenkgsmclonedvgzqfkgjtwo4\n')).toBe('54')
    expect(day1.solveForPartTwo('ninesixrgxccvrqscbskgzxh6cpvpxsqnb6\n')).toBe('96')
  })
})
