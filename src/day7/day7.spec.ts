import day7 from './index'

describe('On Day 7', () => {
  it('part1 is identity function', () => {
    expect(day7.solveForPartOne('32T3K 765\n' +
      'T55J5 684\n' +
      'KK677 28\n' +
      'KTJJT 220\n' +
      'QQQJA 483')).toBe('6440')

    expect(day7.solveForPartTwo('32T3K 765\n' +
      'T55J5 684\n' +
      'KK677 28\n' +
      'KTJJT 220\n' +
      'QQQJA 483')).toBe('5905')
  })
})
