import { Day } from './day'
import day1 from './day1/index'
import day2 from './day2/index'
import day3 from './day3/index'
import day4 from './day4/index'
import day5 from './day5/index';
// MORE IMPORTS HERE
const days: Day[] = [
  day1,
  day2,
  day3,
  day4,
  day5,
    // MORE DAYS HERE
]

async function runDay (dayId: number) {
  const start1 = Date.now()
  const part1 = await days[dayId].partOne()
  const end1 = Date.now()

  const start2 = Date.now()
  const part2 = await days[dayId].partTwo()
  const end2 = Date.now()

  console.log('Part 1 result:', part1, `\nExecution time: ${end1 - start1} ms`, '\n')
  console.log('Part 2 result:', part2, `\nExecution time: ${end2 - start2} ms`)
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
