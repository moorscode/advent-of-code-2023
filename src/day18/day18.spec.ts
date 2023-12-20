import day18 from './index'

describe('On Day 18', () => {
  it('part1', () => {
    expect(day18.solveForPartOne('R 6 (#70c710)\n' +
      'D 5 (#0dc571)\n' +
      'L 2 (#5713f0)\n' +
      'D 2 (#d2c081)\n' +
      'R 2 (#59c680)\n' +
      'D 2 (#411b91)\n' +
      'L 5 (#8ceee2)\n' +
      'U 2 (#caa173)\n' +
      'L 1 (#1b58a2)\n' +
      'U 2 (#caa171)\n' +
      'R 2 (#7807d2)\n' +
      'U 3 (#a77fa3)\n' +
      'L 2 (#015232)\n' +
      'U 2 (#7a21e3)\n')).toBe('62')
  })
  it('part2', () => {
    expect(day18.solveForPartTwo('hello')).toBe('hello')
  })
})
