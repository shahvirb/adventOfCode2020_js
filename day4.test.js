const { NumericalRangePolicy, UnitsRangePolicy } = require('./day4')
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
  test('x1 in range', () => {
    expect(policy.validate('5x1')).toBe(true)
  })
})