import day9 from './index'

describe('On Day 9', () => {
  it('part1 is identity function', () => {
    expect(day9.solveForPartOne('0 3 6 9 12 15\n' +
      '1 3 6 10 15 21\n' +
      '10 13 16 21 30 45')).toBe('114')
    expect(day9.solveForPartOne('6 10 25 60 117 185 229 172 -132 -929 -2572 -5428 -9527 -13670 -13536 1910 56714 198328 513971 1155396 2375181')).toBe('4578455')
    expect(day9.solveForPartTwo('0 3 6 9 12 15\n' +
      '1 3 6 10 15 21\n' +
      '10 13 16 21 30 45')).toBe('2')
  })
})
