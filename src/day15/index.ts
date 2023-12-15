import { Day } from '../day'

type Lens = {
  label: string;
  focalLength: number;
}

type Box = Record<number, Lens[]>

class Day15 extends Day {
  constructor () {
    super(15)
  }

  solveForPartOne (input: string): string {
    const instructions = input.replace('\n', '').trim().split(',').map(chars => chars.split(''))
    const values = instructions.map(this.hash)

    return values.reduce((total, n) => total + n, 0).toString()
  }

  solveForPartTwo (input: string): string {
    const boxes: Box = []

    input.replace('\n', '').trim().split(',')
      .forEach(chars => {
        const match = chars.match(/(\w+)([-=])([0-9]?)/)
        if (!match) return

        const info = {
          label: match[1],
          box: this.hash(match[1].split('')),
          action: match[2]
        }

        if (info.action === '=') {
          this.addOrReplace(boxes, info.box, info.label, parseInt(match[3]))
        }
        if (info.action === '-') {
          this.remove(boxes, info.box, info.label)
        }
      })

    let total = 0

    // @ts-ignore
    boxes.forEach((box, index) => {
      box.forEach((lens: Lens, slot: number) => {
        total += ((index + 1) * (slot + 1) * lens.focalLength)
      })
    })

    return total.toString()
  }

  private hash (values: string[]): number {
    let carry = 0

    values.forEach(value => {
      carry += value.charCodeAt(0)
      carry *= 17
      carry %= 256
    })

    return carry
  }

  private addOrReplace (boxes: Box, box: number, label: string, focalLength: number) {
    const lens: Lens = { label, focalLength }

    // Box is empty, create a new array with only the lens.
    if (!boxes[box]) {
      boxes[box] = [lens]
      return
    }

    // Try to find the lens in the box.
    const elementIndex = boxes[box].findIndex(element => element.label === label)
    // Lens is not present, add it to the stack.
    if (elementIndex === -1) {
      boxes[box].push(lens)
      return
    }

    // Replace the focal length of the found lens.
    boxes[box][elementIndex].focalLength = focalLength
  }

  private remove (boxes: Box, box: number, label: string) {
    if (!boxes[box]) {
      return
    }

    boxes[box] = boxes[box].filter(element => element.label !== label)
  }
}

export default new Day15()
