import day6 from './index'

describe('On Day 6', () => {
  it('part1 is identity function', () => {
    expect(day6.solveForPartOne('Time:      7  15   30\n' +
      'Distance:  9  40  200\n')).toBe('288')
    expect(day6.solveForPartTwo('Time:      71530\n' +
      'Distance:  940200')).toBe('71503')
  })
})
