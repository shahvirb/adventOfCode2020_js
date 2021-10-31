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

const SLOPE_RIGHT = 3
const SLOPE_DOWN = 1
let trees = 0
for (let n = 1; n < treeMap.ySize / SLOPE_DOWN; n++) {
  const x = n * SLOPE_RIGHT
  const y = n * SLOPE_DOWN
  const current = treeMap.at(x, y)
  if (current === '#') trees++
  console.log(n, current, current === '#')
}
console.log(trees)
// treeMap.consoleLog()
