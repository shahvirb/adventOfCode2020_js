const { NumericalRangePolicy } = require('./day4')
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
