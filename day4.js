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

  validate (str, suffixLength = 2) {
    const units = str.slice(-suffixLength)
    const value = str.slice(0, str.length - suffixLength)
    return this.unitPolicyMap.has(units) && this.unitPolicyMap.get(units).validate(value)
  }
}

class RegexPolicy {
  constructor (regexStr) {
    this.regex = new RegExp('^' + regexStr + '$')
  }

  validate (str) {
    return this.regex.test(str)
  }
}
const heightPolicyMap = new Map([
  ['cm', new NumericalRangePolicy(150, 193)],
  ['in', new NumericalRangePolicy(59, 76)]
])
const HAIRCOLOR_REGEX = '#[0-9a-f]{6}'
const EYECOLORS_REGEX = '(amb|blu|brn|gry|grn|hzl|oth)'
const PASSPORT_ID_REGEX = '[0-9]{9}'
const POLICIES = [
  ['byr', new NumericalRangePolicy(1920, 2002)],
  ['iyr', new NumericalRangePolicy(2010, 2020)],
  ['eyr', new NumericalRangePolicy(2020, 2030)],
  ['hgt', new UnitsRangePolicy(heightPolicyMap)],
  ['hcl', new RegexPolicy(HAIRCOLOR_REGEX)],
  ['ecl', new RegexPolicy(EYECOLORS_REGEX)],
  ['pid', new RegexPolicy(PASSPORT_ID_REGEX)]
]

module.exports = {
  NumericalRangePolicy,
  UnitsRangePolicy,
  RegexPolicy,
  HAIRCOLOR_REGEX,
  POLICIES
}

if (require.main === module) {
  const readfile = require('./readfile')
  const { EOL } = require('os')
  const passportStrings = readfile.readFile('day4.txt').split(EOL + EOL).map(x => x.split(EOL).join(' ').trim())

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

  function countPassports (passports, validationFn) {
    let count = 0
    passports.forEach(passport => {
      if (validationFn(passport)) count++
    })
    return count
  }

  // Part 1
  console.log('Part 1 answer:', countPassports(passports, validateRequiredFields))

  { // Part 2
    function validatePassport (passport, policies) {
      for (const policy of policies) {
        const fieldVal = passport.get(policy[0])
        if (!fieldVal || !policy[1].validate(fieldVal)) return false
      }
      return true
    }

    const count = countPassports(passports, passport => {
      return validatePassport(passport, POLICIES)
    })
    console.log('Part 2 answer:', count)
  }
}
