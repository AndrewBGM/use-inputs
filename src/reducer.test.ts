import reducer, { ReducerAction } from './reducer'

describe('reducer', () => {
  it('should do nothing on an invalid action', () => {
    const obj = {}
    expect(reducer(obj, {} as ReducerAction)).toBe(obj)
  })
})
