import { Day } from '../day'

type Card = {
  type: string;
  value: number;
  key: string;
}

type Hand = Card[]

type Input = {
  cards: Hand,
  bid: number
}

const Ace: Card = { type: 'ace', value: 14, key: 'A' }
const King: Card = { type: 'king', value: 13, key: 'K' }
const Queen: Card = { type: 'queen', value: 12, key: 'Q' }
const Jack: Card = { type: 'jack', value: 11, key: 'J' }
const Ten: Card = { type: 'number', value: 10, key: 'T' }
const Nine: Card = { type: 'number', value: 9, key: '9' }
const Eight: Card = { type: 'number', value: 8, key: '8' }
const Seven: Card = { type: 'number', value: 7, key: '7' }
const Six: Card = { type: 'number', value: 6, key: '6' }
const Five: Card = { type: 'number', value: 5, key: '5' }
const Four: Card = { type: 'number', value: 4, key: '4' }
const Three: Card = { type: 'number', value: 3, key: '3' }
const Two: Card = { type: 'number', value: 2, key: '2' }
const Joker: Card = { type: 'joker', value: 1, key: 'J' }

type Group = {
  value: number,
  amount: number,
  key: string,
}

type HandData = {
  hand: number,
  data: Group[]
}

class Day7 extends Day {
  private cards: Card[] = []

  constructor () {
    super(7)
  }

  toCards (input: string): Card[] {
    return input.split('').map((char: string) => this.cards.find(card => card.key === char) || Joker)
  }

  groupCards (cards: Hand): Group[] {
    const grouped = cards.reduce((grouped: Record<string, Card[]>, card: Card) => {
      grouped[card.key] = grouped[card.key] || []
      grouped[card.key].push(card)
      return grouped
    }, {})

    return Object.keys(grouped).reduce((a: Group[], key) => {
      a.push({
        value: grouped[key][0].value,
        amount: grouped[key].length,
        key
      })
      return a
    }, [])
  }

  sortHands (hands: Hand[], originalHands: Hand[]): number[] {
    const groupedHands = hands.map(hand => this.groupCards(hand))
    const keyed: HandData[] = groupedHands.map((group, index) => {
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
        if (originalHands[a.hand][i].value === originalHands[b.hand][i].value) {
          continue
        }
        return originalHands[b.hand][i].value - originalHands[a.hand][i].value
      }

      return 0
    })

    return keyed.map(b => b.hand)
  }

  convertJokers (cards: Card[]): Card[] {
    // No jokers, done.
    if (cards.filter(card => card.key === 'J').length === 0) {
      return cards
    }

    // Only jokers, just return them.
    const otherCards = cards.filter(card => card.key !== 'J')
    if (otherCards.length === 0) {
      return cards
    }

    // Group the cards
    const grouped = this.groupCards(otherCards).sort((a, b) => {
      if (a.amount === b.amount) {
        return b.value - a.value
      }
      return b.amount - a.amount
    })

    // Get card type of the best group
    const replace: Card = this.cards.find(card => card.key === grouped[0].key) || Joker

    // Replace all Jokers with card type
    return cards.map(card => {
      if (card.key === 'J') {
        return replace
      }
      return card
    })
  }

  solveForPartOne (input: string): string {
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

    const data: Input[] = input.split('\n').filter(a => a).map(line => {
      const parts = line.split(' ')
      return {
        cards: this.toCards(parts[0]),
        bid: parseInt(parts[1])
      }
    })

    const hands: Hand[] = data.map(({ cards }) => cards)
    const sorted: number[] = this.sortHands(hands, hands)
    sorted.reverse()

    const winnings = sorted.reduce((total, cardIndex, rank) => {
      return total + ((rank + 1) * data[cardIndex].bid)
    }, 0)

    return winnings.toString()
  }

  solveForPartTwo (input: string): string {
    this.cards = [
      Joker,
      Two,
      Three,
      Four,
      Five,
      Six,
      Seven,
      Eight,
      Nine,
      Ten,
      Queen,
      King,
      Ace
    ]

    const data: Input[] = input.split('\n').filter(a => a).map(line => {
      const parts = line.split(' ')
      return {
        cards: this.toCards(parts[0]),
        bid: parseInt(parts[1])
      }
    })

    const sorted: number[] = this.sortHands(data.map(({ cards }) => this.convertJokers(cards)), data.map(({ cards }) => cards))
    sorted.reverse()

    const winnings = sorted.reduce((total, cardIndex, rank) => {
      return total + ((rank + 1) * data[cardIndex].bid)
    }, 0)

    return winnings.toString()
  }
}

export default new Day7()
