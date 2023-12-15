import day15 from './index'

describe('On Day 15', () => {
  it('part1', () => {
    expect(day15.solveForPartOne('rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7')).toBe('1320')
  })
  it('part2', () => {
    expect(day15.solveForPartTwo('rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7')).toBe('145')
  })
})
