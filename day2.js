class PasswordLine {
  constructor (line) {
    const elements = line.split(' ')
    console.assert(elements.length === 3)
    const minMax = elements[0].split('-').map(s => parseInt(s))

    this.policyChar = elements[1][0]
    this.policyCharLo = minMax[0]
    this.policyCharHi = minMax[1]
    this.password = elements[2]
  }

  checkOldJob () {
    const count = [...this.password].filter(x => x === this.policyChar).length
    return (count >= this.policyCharLo && count <= this.policyCharHi)
  }

  checkTobogganCorporate () {
    return (this.password[this.policyCharLo - 1] === this.policyChar) !== (this.password[this.policyCharHi - 1] === this.policyChar)
  }
}

const readfile = require('./readfile')
const lines = readfile.readLines('day2.txt', line => new PasswordLine(line))

let c1 = 0
let c2 = 0
for (const line of lines) {
  if (line.checkOldJob()) c1++
  if (line.checkTobogganCorporate()) c2++
}
console.log(`Part 1 answer: ${c1}`)
console.log(`Part 2 answer: ${c2}`)
