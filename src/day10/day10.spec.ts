import day10 from './index'

describe('On Day 10', () => {
  it('part1', () => {
    expect(day10.solveForPartOne('..F7.\n' +
      '.FJ|.\n' +
      'SJ.L7\n' +
      '|F--J\n' +
      'LJ...')).toBe('8')
  })
  it('part2', () => {
    expect(day10.solveForPartTwo(
      'FF7FSF7F7F7F7F7F---7\n' +
      'L|LJ||||||||||||F--J\n' +
      'FL-7LJLJ||||||LJL-77\n' +
      'F--JF--7||LJLJ7F7FJ-\n' +
      'L---JF-JLJ.||-FJLJJ7\n' +
      '|F|F-JF---7F7-L7L|7|\n' +
      '|FFJF7L7F-JF7|JL---7\n' +
      '7-L-JL7||F7|L7F-7F7|\n' +
      'L.L7LFJ|||||FJL7||LJ\n' +
      'L7JLJL-JLJLJL--JLJ.L\n')).toBe('10')
    expect(day10.solveForPartTwo(
      '...........\n' +
      '.S-------7.\n' +
      '.|F-----7|.\n' +
      '.||.....||.\n' +
      '.||.....||.\n' +
      '.|L-7.F-J|.\n' +
      '.|..|.|..|.\n' +
      '.L--J.L--J.\n' +
      '...........\n')).toBe('4')
  })
})
