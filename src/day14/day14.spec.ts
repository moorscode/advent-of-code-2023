import day14 from './index'

describe('On Day 14', () => {
  it('part1', () => {
    expect(day14.solveForPartOne('O....#....\n' +
      'O.OO#....#\n' +
      '.....##...\n' +
      'OO.#O....O\n' +
      '.O.....O#.\n' +
      'O.#..O.#.#\n' +
      '..O..#O..O\n' +
      '.......O..\n' +
      '#....###..\n' +
      '#OO..#....\n')).toBe('136')
  })
  it('part2', () => {
    expect(day14.solveForPartTwo('O....#....\n' +
      'O.OO#....#\n' +
      '.....##...\n' +
      'OO.#O....O\n' +
      '.O.....O#.\n' +
      'O.#..O.#.#\n' +
      '..O..#O..O\n' +
      '.......O..\n' +
      '#....###..\n' +
      '#OO..#....\n')).toBe('64')
  })
})
