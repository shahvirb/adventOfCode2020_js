class PasswordLine {
  constructor (line) {
    const elements = line.split(' ')
    console.assert(elements.length === 3)
    const minMax = elements[0].split('-').map(s => parseInt(s))

    this.policyChar = elements[1][0]
    this.policyCharMin = minMax[0]
    this.policyCharMax = minMax[1]
    this.password = elements[2]
  }

  check () {
    const count = [...this.password].filter(x => x === this.policyChar).length
    return (count >= this.policyCharMin && count <= this.policyCharMax)
  }
}

const readfile = require('./readfile')
const lines = readfile.readLines('day2.txt', line => new PasswordLine(line))

let count = 0
for (const line of lines) {
  if (line.check()) count++
}
console.log(count)
