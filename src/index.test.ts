import { act, renderHook } from '@testing-library/react-hooks'
import { ChangeEvent } from 'react'
import { useInputs, wrapInput } from '.'

describe('useInputs', () => {
  it('should support string values', () => {
    const { result } = renderHook(() =>
      useInputs({
        test: 'foo',
      })
    )

    expect(result.current.test.id).not.toBeFalsy()
    expect(result.current.test.initialValue).toBe('foo')
    expect(result.current.test.name).toBe('test')
    expect(result.current.test.value).toBe('foo')

    act(() => {
      result.current.test.update('bar')
    })

    expect(result.current.test.value).toBe('bar')

    act(() => {
      result.current.test.reset()
    })

    expect(result.current.test.value).toBe('foo')
  })

  it('should support number values', () => {
    const { result } = renderHook(() =>
      useInputs({
        test: 1,
      })
    )

    expect(result.current.test.id).not.toBeFalsy()
    expect(result.current.test.initialValue).toBe(1)
    expect(result.current.test.name).toBe('test')
    expect(result.current.test.value).toBe(1)

    act(() => {
      result.current.test.update(2)
    })

    expect(result.current.test.value).toBe(2)

    act(() => {
      result.current.test.reset()
    })

    expect(result.current.test.value).toBe(1)
  })

  it('should support boolean values', () => {
    const { result } = renderHook(() =>
      useInputs({
        test: false,
      })
    )

    expect(result.current.test.id).not.toBeFalsy()
    expect(result.current.test.initialValue).toBe(false)
    expect(result.current.test.name).toBe('test')
    expect(result.current.test.value).toBe(false)

    act(() => {
      result.current.test.update(true)
    })

    expect(result.current.test.value).toBe(true)

    act(() => {
      result.current.test.reset()
    })

    expect(result.current.test.value).toBe(false)
  })
})

describe('wrapInput', () => {
  it('should return valid input props for a given string descriptor', () => {
    const update = jest.fn()
    const reset = jest.fn()

    const props = wrapInput({
      id: 'id',
      initialValue: 'foo',
      name: 'name',
      value: 'foo',
      update,
      reset,
    })

    expect(props.id).toBe('id')
    expect(props.name).toBe('name')
    expect(props.value).toBe('foo')

    act(() => {
      props.onChange?.({
        target: {
          value: 'bar',
        },
      } as ChangeEvent<HTMLInputElement>)
    })

    expect(update).toBeCalledWith('bar')
  })

  it('should return valid input props for a given number descriptor', () => {
    const update = jest.fn()
    const reset = jest.fn()

    const props = wrapInput({
      id: 'id',
      initialValue: 1,
      name: 'name',
      value: 1,
      update,
      reset,
    })

    expect(props.id).toBe('id')
    expect(props.name).toBe('name')
    expect(props.value).toBe(1)

    act(() => {
      props.onChange?.({
        target: {
          valueAsNumber: 2,
        },
      } as ChangeEvent<HTMLInputElement>)
    })

    expect(update).toBeCalledWith(2)
  })

  it('should return valid input props for a given boolean descriptor', () => {
    const update = jest.fn()
    const reset = jest.fn()

    const props = wrapInput({
      id: 'id',
      initialValue: false,
      name: 'name',
      value: false,
      update,
      reset,
    })

    expect(props.id).toBe('id')
    expect(props.name).toBe('name')
    expect(props.checked).toBe(false)

    act(() => {
      props.onChange?.({
        target: {
          checked: true,
        },
      } as ChangeEvent<HTMLInputElement>)
    })

    expect(update).toBeCalledWith(true)
  })
})
