import { generateId } from './generate-id'

describe('generateId', () => {
  it('should support generating 1 character', () => {
    expect(generateId(1)).toHaveLength(1)
  })
})
