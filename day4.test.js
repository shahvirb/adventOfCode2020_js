const { NumericalRangePolicy, UnitsRangePolicy, RegexPolicy, HAIRCOLOR_REGEX } = require('./day4')

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
describe('RegexPolicy() haircolor', () => {
  const haircolorPolicy = new RegexPolicy(HAIRCOLOR_REGEX)
  test('#123abc valid', () => {
    expect(haircolorPolicy.validate('#123abc')).toBe(true)
  })
  test('#123abz invalid', () => {
    expect(haircolorPolicy.validate('#123abz')).toBe(false)
  })
})
