import { Day } from '../day'

class Day4 extends Day {
  constructor () {
    super(4)
  }

  solveForPartOne (input: string): string {
    const cards = input.split('\n').filter(a => a).map(row => {
      const [card, data] = row.split(': ')
      const cardNumber = parseInt(card.replace('Card ', ''), 10)
      const parts = data.replace(/\s+/g, ' ').split(' | ')

      const winners = parts[0].split(' ').map(value => parseInt(value.trim(), 10)).sort()
      const numbers = parts[1].split(' ').map(value => parseInt(value.trim(), 10)).sort()

      return {
        card: cardNumber,
        winners: winners,
        numbers: numbers
      }
    })

    let total = 0

    cards.forEach(card => {
      let winners = 0
      card.winners.forEach(winner => {
        if (card.numbers.includes(winner)) {
          winners++
        }
      })

      if (winners > 0) {
        total += (Math.pow(2, winners - 1))
      }
    })

    return total.toString()
  }

  solveForPartTwo (input: string): string {
    const cards = input.split('\n').filter(a => a).map(row => {
      const [card, data] = row.split(': ')
      const cardNumber = parseInt(card.replace('Card ', ''), 10)
      const parts = data.replace(/\s+/g, ' ').split(' | ')

      const winners = parts[0].split(' ').map(value => parseInt(value.trim(), 10)).sort()
      const numbers = parts[1].split(' ').map(value => parseInt(value.trim(), 10)).sort()

      return {
        card: cardNumber,
        winners: winners,
        numbers: numbers
      }
    })

    let total = 0

    const copies: number[] = cards.reduce((copies, card) => {
      // @ts-ignore
      copies[card.card] = 1
      return copies
    }, [])

    do {
      cards.forEach(card => {
        let winners = 0
        if (copies[card.card] === 0) {
          return
        }

        card.winners.forEach(winner => {
          if (card.numbers.includes(winner)) {
            winners++
          }
        })

        for (let w = 1; w <= winners; w++) {
          if (copies[card.card + w]) {
            copies[card.card + w] += copies[card.card]
          }
        }

        total += copies[card.card]

        // We've managed this card, so let's forget it.
        copies[card.card] = 0
      })
    } while (copies.reduce((total, copy) => total + copy, 0) > 0)

    return total.toString()
  }
}

export default new Day4()
