import { Day } from '../day'

type Props = 'a' | 'm' | 's' | 'x';

type FinalCondition = {
  finally: string
}

type Condition = {
  prop: Props;
  operand: string;
  value: number;
  target: string;
};

type Workflow = Condition | FinalCondition

type Workflows = {
  [key: string]: (Condition | FinalCondition)[];
}

type Rating = { a: number; s: number; x: number; m: number }

class Day19 extends Day {
  constructor () {
    super(19)
  }

  solveForPartOne (input: string): string {
    const [first, second] = input.split('\n\n')
    const workflows: Workflows = first.split('\n').filter(a => a).reduce((data: Workflows, line) => {
      const result = line.match(/(\w+)\{(.*)\}/) || []

      const c = [...result[2].matchAll(/(\w+)([<>])(\d+):(\w+)/g)] || []
      const last = result[2].match(/,(\w+)$/)

      data[result[1] as string] = data[result[1] as string] || []
      data[result[1] as string] = c.map((condition): Condition => {
        return {
          prop: condition[1] as Props,
          operand: condition[2],
          value: parseInt(condition[3]),
          target: condition[4]
        }
      })

      if (last) {
        data[result[1] as string].push({ finally: last[1] })
      }

      return data
    }, {})

    const ratings: Rating[] = second.split('\n').filter(a => a).map(line => {
      const match = line.match(/x=(\d+),m=(\d+),a=(\d+),s=(\d+)/) || []
      return {
        x: parseInt(match[1], 10),
        m: parseInt(match[2], 10),
        a: parseInt(match[3], 10),
        s: parseInt(match[4], 10)
      }
    })

    const accepted = ratings.filter(rating => this.solve(rating, 'in', workflows))
    return accepted.reduce((total, accept) => total + (accept.a + accept.m + accept.x + accept.s), 0).toString()
  }

  solveForPartTwo (input: string): string {
    return input
  }

  private solve (rating: Rating, workflow: string, workflows: Workflows): boolean {
    if (workflow === 'A') {
      return true
    }

    if (workflow === 'R') {
      return false
    }

    const t: Workflow[] = workflows[workflow]

    for (const x of t) {
      const condition = (x as Condition)
      const finalCondition = (x as FinalCondition)

      if (finalCondition.finally) {
        return this.solve(rating, finalCondition.finally, workflows)
      }
      if (condition.operand === '>') {
        if (rating[condition.prop] > condition.value) {
          return this.solve(rating, condition.target, workflows)
        }
      }
      if (condition.operand === '<') {
        if (rating[condition.prop] < condition.value) {
          return this.solve(rating, condition.target, workflows)
        }
      }
    }

    return false
  }
}

export default new Day19()
