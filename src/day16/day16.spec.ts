import day16 from './index'

describe('On Day 16', () => {
  it('part1', () => {
    expect(day16.solveForPartOne(
      '' +
      '.|...\\....\n' +
      '|.-.\\.....\n' +
      '.....|-...\n' +
      '........|.\n' +
      '..........\n' +
      '.........\\\n' +
      '..../.\\\\..\n' +
      '.-.-/..|..\n' +
      '.|....-|.\\\n' +
      '..//.|....\n')).toBe('46')
  })
  it('part2', () => {
    expect(day16.solveForPartTwo('hello')).toBe('hello')
  })
})
