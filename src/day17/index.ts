import { Day } from '../day'

type NodeVertex = {
  nameOfVertex: string;
  weight: number;
}

type Vertex = {
  name: string;
  nodes: NodeVertex[];
  weight: number;
}

type VertexList = {
  [key: string]: Vertex
}

type NodeList = {
  [key: string]: number
}

class Dijkstra {
  private vertices: VertexList = {}

  addVertex (vertex: Vertex): void {
    this.vertices[vertex.name] = vertex
  }

  findPointsOfShortestWay (start: string, finish: string): number[] {
    let nextVertex: string = finish
    const arrayWithVertex: number[] = []
    while (nextVertex !== start) {
      let minWeight: number = Number.MAX_VALUE
      for (const i of this.vertices[nextVertex].nodes) {
        if (i.weight + this.vertices[i.nameOfVertex].weight < minWeight) {
          minWeight = this.vertices[i.nameOfVertex].weight
          arrayWithVertex.push(i.weight)
          nextVertex = i.nameOfVertex
          break
        }
      }
    }
    return arrayWithVertex
  }

  findShortestWay (start: string, finish: string): number {
    const nodes: NodeList = {}

    for (const i in this.vertices) {
      if (this.vertices[i].name === start) {
        this.vertices[i].weight = 0
      } else {
        this.vertices[i].weight = Number.MAX_VALUE
      }
      nodes[this.vertices[i].name] = this.vertices[i].weight
    }

    while (Object.keys(nodes).length !== 0) {
      const sortedVisitedByWeight: string[] = Object.keys(nodes).sort((a, b) => this.vertices[a].weight - this.vertices[b].weight)
      const currentVertex: Vertex = this.vertices[sortedVisitedByWeight[0]]
      for (const j of currentVertex.nodes) {
        const calculateWeight: number = currentVertex.weight + j.weight
        if (calculateWeight < this.vertices[j.nameOfVertex].weight) {
          this.vertices[j.nameOfVertex].weight = calculateWeight
        }
      }
      delete nodes[sortedVisitedByWeight[0]]
    }

    return this.vertices[finish].weight
  }
}

class Day17 extends Day {
  constructor () {
    super(17)
  }

  solveForPartOne (input: string): string {
    // Dijkstra algorithm
    // Options per step include the previous directions
    // Exclude same direction x 4
    const data = input.split('\n').filter(a => a).map(line => line.split('').map(Number))

    const dijkstra = new Dijkstra()
    data.forEach((row, y) => row.forEach((weight, y) => {
      // Collect surrounding items - n,s,w,e
      dijkstra.addVertex({ name: `${y},${y}`, nodes: [], weight })
    }))

    // Find three times the same direction..
    // Recalculate from that point without the 3rd option?
    // Combine results... ?

    return dijkstra.findShortestWay('0,0', `${data.length - 1},${data[0].length - 1}`).toString()
  }

  solveForPartTwo (input: string): string {
    return input
  }
}

export default new Day17()
