const { NumericalRangePolicy, UnitsRangePolicy, POLICIES } = require('./day4')

describe('NumericalRangePolicy()', () => {
  const policy = new NumericalRangePolicy(1, 10)
  test('int in range', () => {
    expect(policy.validate(2)).toBe(true)
  })
  test('int out of range', () => {
    expect(policy.validate(15)).toBe(false)
  })
  test('cast in range', () => {
    expect(policy.validate('5')).toBe(true)
  })
})

describe('UnitsRangePolicy()', () => {
  const unitPolicyMap = new Map([
    ['x1', new NumericalRangePolicy(1, 10)],
    ['x2', new NumericalRangePolicy(1, 20)]
  ])
  const policy = new UnitsRangePolicy(unitPolicyMap)

  test('x1', () => {
    expect(policy.validate('5x1')).toBe(true)
    expect(policy.validate('15x1')).toBe(false)
  })
  test('x2', () => {
    expect(policy.validate('15x2')).toBe(true)
    expect(policy.validate('30x2')).toBe(false)
  })
  test('not a unit', () => {
    expect(policy.validate('34in')).toBe(false)
  })
})

const POLICY_MAP = new Map(POLICIES)

describe('byr', () => {
  const policy = POLICY_MAP.get('byr')
  test('lower bound', () => {
    expect(policy.validate('1920')).toBe(true)
  })
  test('upper bound', () => {
    expect(policy.validate('2002')).toBe(true)
  })
  test('in range', () => {
    expect(policy.validate('1989')).toBe(true)
  })
  test('out of range', () => {
    expect(policy.validate('1900')).toBe(false)
  })
})

describe('iyr', () => {
  const policy = POLICY_MAP.get('iyr')
  test('lower bound', () => {
    expect(policy.validate('2010')).toBe(true)
  })
  test('upper bound', () => {
    expect(policy.validate('2020')).toBe(true)
  })
  test('in range', () => {
    expect(policy.validate('2011')).toBe(true)
  })
  test('out of range', () => {
    expect(policy.validate('1900')).toBe(false)
  })
})

describe('eyr', () => {
  const policy = POLICY_MAP.get('eyr')
  test('lower bound', () => {
    expect(policy.validate('2020')).toBe(true)
  })
  test('upper bound', () => {
    expect(policy.validate('2030')).toBe(true)
  })
  test('in range', () => {
    expect(policy.validate('2025')).toBe(true)
  })
  test('out of range', () => {
    expect(policy.validate('1900')).toBe(false)
  })
})

describe('hgt', () => {
  const policy = POLICY_MAP.get('hgt')
  test('lower bound cm', () => {
    expect(policy.validate('150cm')).toBe(true)
  })
  test('upper bound cm', () => {
    expect(policy.validate('193cm')).toBe(true)
  })
  test('in range cm', () => {
    expect(policy.validate('170cm')).toBe(true)
  })
  test('out of range cm', () => {
    expect(policy.validate('1900cm')).toBe(false)
  })
  test('missing units', () => {
    expect(policy.validate('170')).toBe(false)
  })
  test('wrong units in cm range', () => {
    expect(policy.validate('170in')).toBe(false)
  })
  test('lower bound in', () => {
    expect(policy.validate('59in')).toBe(true)
  })
  test('upper bound in', () => {
    expect(policy.validate('76in')).toBe(true)
  })
  test('in range in', () => {
    expect(policy.validate('70in')).toBe(true)
  })
  test('out of range in', () => {
    expect(policy.validate('1900in')).toBe(false)
  })
  test('wrong units in in range', () => {
    expect(policy.validate('60cm')).toBe(false)
  })
  test('units but no value', () => {
    expect(policy.validate('cm')).toBe(false)
    expect(policy.validate('in')).toBe(false)
  })
})

describe('hcl', () => {
  const haircolorPolicy = POLICY_MAP.get('hcl')
  test('#123abc valid', () => {
    expect(haircolorPolicy.validate('#123abc')).toBe(true)
  })
  test('#123abz invalid', () => {
    expect(haircolorPolicy.validate('#123abz')).toBe(false)
  })
})

describe('ecl', () => {
  const policy = POLICY_MAP.get('ecl')
  const GOOD_COLORS = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']
  for (const color of GOOD_COLORS) {
    test(`good color ${color}`, () => {
      expect(policy.validate(color)).toBe(true)
    })
  }
  test('bad color', () => {
    expect(policy.validate('bad')).toBe(false)
    expect(policy.validate('z')).toBe(false)
    expect(policy.validate('amber')).toBe(false)
  })
})

describe('pid', () => {
  const policy = POLICY_MAP.get('pid')
  test('000000001', () => {
    expect(policy.validate('000000001')).toBe(true)
  })
  test('00a000001', () => {
    expect(policy.validate('00a000001')).toBe(false)
  })
  test('0000000019', () => {
    expect(policy.validate('0000000019')).toBe(false)
  })
})
