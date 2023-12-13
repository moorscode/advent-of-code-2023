import { Day } from './day'
import day1 from './day1/index'
import day2 from './day2/index'
import day3 from './day3/index'
import day4 from './day4/index'
import day5 from './day5/index'
import day6 from './day6/index'
import day7 from './day7/index'
import day8 from './day8/index'
import day9 from './day9/index'
import day10 from './day10/index'
import day11 from './day11/index'
import day12 from './day12/index';
import day13 from './day13/index';
// MORE IMPORTS HERE
const days: Day[] = [
  day1,
  day2,
  day3,
  day4,
  day5,
  day6,
  day7,
  day8,
  day9,
  day10,
  day11,
  day12,
    day13,
    // MORE DAYS HERE
]

async function runDay (dayId: number) {
  const part1 = await days[dayId].partOne()
  console.log('Part 1 result:', part1.result, `\nExecution time: ${part1.timing} ms`, '\n')

  const part2 = await days[dayId].partTwo()
  console.log('Part 2 result:', part2.result, `\nExecution time: ${part2.timing} ms`)
}

async function run (params: string[]) {
  if (params.length === 1) {
    const day = parseInt(params[0], 10)
    console.log(`ADVENT OF CODE: Day ${day}\n`)
    await runDay(day - 1)
    return
  }

  console.log('Usage: npm run start [day]')
  console.log(`Available days: [ ${days.map((x) => x.id).join(', ')} ]`)
}

run(process.argv.splice(2))
