class TreeMap {
  constructor (lines) {
    this.cells = lines.map(l => l.split(''))
    this.xSize = this.cells[0].length
    this.ySize = this.cells.length
  }

  at (x, y) {
    return this.cells[y % this.ySize][x % this.xSize]
  }

  set (x, y, val) {
    this.cells[y % this.ySize][x % this.xSize] = val
  }

  consoleLog (xScale = 1, yScale = 1) {
    for (let y = 0; y < this.ySize * yScale; y++) {
      let line = ''
      for (let x = 0; x < this.xSize * xScale; x++) {
        line += this.at(x, y)
      }
      console.log(line)
    }
  }
}

// class TreeMapScaling extends TreeMap {
//   extendRight () {
//     this.cells = this.cells.map(row => row.concat(row))
//     this.xSize = this.cells[0].length
//   }

//   extendDown () {
//     throw new Error('extendDown should never be needed')
//   }

//   extendIfCoordsOffMap (x, y) {
//     while (x >= this.xSize) {
//       this.extendRight()
//     }

//     while (y >= this.ySize) {
//       this.extendDown()
//     }
//   }

//   at (x, y) {
//     this.extendIfCoordsOffMap(x, y)
//     return super.at(x, y)
//   }

//   set (x, y, val) {
//     this.extendIfCoordsOffMap(x, y)
//     super.set(x, y, val)
//   }
// }

const readfile = require('./readfile')
const lines = readfile.readLines('day3.txt')
const treeMap = new TreeMap(lines)

function countTrees (treeMap, slopeRight, slopeDown) {
  let trees = 0
  for (let n = 1; n < treeMap.ySize / slopeDown; n++) {
    const x = n * slopeRight
    const y = n * slopeDown
    const current = treeMap.at(x, y)
    if (current === '#') { trees++ }
    // console.log(n, current, current === '#')
  }
  return trees
}

console.log('Part 1 Answer:', countTrees(treeMap, 3, 1))

const P2_SLOPES = [
  [1, 1],
  [3, 1],
  [5, 1],
  [7, 1],
  [1, 2]
]
let product = 1
for (const slope of P2_SLOPES) {
  const trees = countTrees(treeMap, ...slope)
  product *= trees
  console.log(slope, trees)
}
console.log('Part 2 Answer:', product)
