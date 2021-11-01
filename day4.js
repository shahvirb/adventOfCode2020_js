const readfile = require('./readfile')
const passportStrings = readfile.readFile('day4.txt').split('\n\r').map(x => x.split('\n').join(' ').trim())

function genPassportMap (str) {
  return new Map(str.split(' ').map(x => x.split(':')))
}

const passports = passportStrings.map(genPassportMap)

const REQUIRED_FIELDS = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']
function validateRequiredFields (passport, reqFields = REQUIRED_FIELDS) {
  if (passport.size < reqFields.length) return false
  for (const key of reqFields) {
    if (!passport.has(key)) return false
  }
  return true
}

let count = 0
passports.forEach(p => {
  const valid = validateRequiredFields(p)
  if (valid) count++
  // console.log(p, valid)
})
console.log('Part 1 answer:', count)
