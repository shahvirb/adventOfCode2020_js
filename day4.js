class NumericalRangePolicy {
  constructor (lo, hi) {
    this.lo = lo
    this.hi = hi
  }

  validate (x) {
    return ((this.lo <= x) && (x <= this.hi))
  }
}

class UnitsRangePolicy {
  constructor (unitPolicyMap) {
    this.unitPolicyMap = unitPolicyMap
  }

  validate(str, suffixLength = 2) {
    const units = str.slice(-suffixLength)
    const value = str.slice(0, str.length - suffixLength)
    return this.unitPolicyMap[units].validate(value)
  }
}

module.exports = {
  NumericalRangePolicy,
  UnitsRangePolicy
}

if (require.main === module) {
  const readfile = require('./readfile')
  const passportStrings = readfile.readFile('day4.txt').split('\n\n').map(x => x.split('\n').join(' ').trim())

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

  // const policies = [['byr', new NumericalRangePolicy(1920, 2002)]]
  // passports.forEach(passport => {
  //   policies.forEach
  // })
}
