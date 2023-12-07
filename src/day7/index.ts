import { Day } from '../day'

type Card = {
  type: string;
  value: number;
  key: string;
}

type Hand = Card[]

const Ace: Card = {
  type: 'ace',
  value: 14,
  key: 'A'
}

const King: Card = {
  type: 'king',
  value: 13,
  key: 'K'
}

const Queen: Card = {
  type: 'queen',
  value: 12,
  key: 'Q'
}

const Jack: Card = {
  type: 'jack',
  value: 11,
  key: 'J'
}

const Ten: Card = {
  type: 'number',
  value: 10,
  key: 'T'
}

const Nine: Card = {
  type: 'number',
  value: 9,
  key: '9'
}

const Eight: Card = {
  type: 'number',
  value: 8,
  key: '8'
}
const Seven: Card = {
  type: 'number',
  value: 7,
  key: '7'
}
const Six: Card = {
  type: 'number',
  value: 6,
  key: '6'
}
const Five: Card = {
  type: 'number',
  value: 5,
  key: '5'
}
const Four: Card = {
  type: 'number',
  value: 4,
  key: '4'
}
const Three: Card = {
  type: 'number',
  value: 3,
  key: '3'
}
const Two: Card = {
  type: 'number',
  value: 2,
  key: '2'
}

type Group = {
  value: number,
  amount: number,
}

class Day7 extends Day {
  private cards: Card[]

  constructor () {
    super(7)

    this.cards = [
      Two,
      Three,
      Four,
      Five,
      Six,
      Seven,
      Eight,
      Nine,
      Ten,
      Jack,
      Queen,
      King,
      Ace
    ]
  }

  toCards (input: string): Card[] {
    // @ts-ignore
    return input.split('').map((char: string) => this.cards.find(card => card.key === char))
  }

  sortHands (hands: Hand[]): number[] {
    const data = hands.map(hand => {
      // @ts-ignore
      const grouped = hand.reduce((grouped: Card[string], card) => {
        grouped[card.key] = grouped[card.key] || []
        grouped[card.key].push(card)
        return grouped
      }, [])

      return Object.keys(grouped).reduce((a: Group[], key) => {
        a.push({
          // @ts-ignore
          value: grouped[key][0].value,
          // @ts-ignore
          amount: grouped[key].length
        })
        return a
      }, [])
    })

    const keyed = data.map((group, index) => {
      return {
        hand: index,
        data: group.sort((a, b) => {
          if (a.amount === b.amount) {
            return b.value - a.value
          }
          return b.amount - a.amount
        })
      }
    })

    keyed.sort((a, b) => {
      if (a.data[0].amount !== b.data[0].amount) {
        return b.data[0].amount - a.data[0].amount
      }

      // Deal with 3+2
      if (a.data[0].amount === 3 && b.data[0].amount === 3) {
        if (a.data[1].amount !== b.data[1].amount) {
          return b.data[1].amount - a.data[1].amount
        }
      }

      // Deal with 2+2
      if (a.data[0].amount === 2 && b.data[0].amount === 2) {
        if (a.data[1].amount !== b.data[1].amount) {
          return b.data[1].amount - a.data[1].amount
        }
      }

      for (let i = 0; i < 5; i++) {
        if (hands[a.hand][i].value === hands[b.hand][i].value) {
          continue
        }
        return hands[b.hand][i].value - hands[a.hand][i].value
      }

      return 0
    })

    return keyed.map(b => b.hand)
  }

  solveForPartOne (input: string): string {
    const data = input.split('\n').filter(a => a).map(line => {
      const parts = line.split(' ')
      return {
        cards: this.toCards(parts[0]),
        bid: parseInt(parts[1])
      }
    })

    const sorted = this.sortHands(data.map(({ cards }) => cards))
    sorted.reverse()

    const winnings = sorted.reduce((total, cardIndex, rank) => {
      // console.log((rank + 1), data[cardIndex].bid, data[cardIndex].cards.map(card => card.key))
      return total + ((rank + 1) * data[cardIndex].bid)
    }, 0)

    return winnings.toString()
  }

  solveForPartTwo (input: string): string {
    return input
  }
}

export default new Day7()
