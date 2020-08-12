import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  useReducer,
  useState,
} from 'react'
import { buildDescriptorPartial } from './build-descriptor-partial'
import reducer, { resetInput, updateInput } from './reducer'

type ValueWrapper<
  TValue extends InputValue = InputValue
> = TValue extends boolean ? boolean : TValue extends string ? string : number

export interface InputDescriptor<TValue extends InputValue = InputValue> {
  id: string
  initialValue: TValue
  name: string
  value: TValue

  update: (value: TValue) => void
  reset: () => void
}

export type InputDescriptors<
  TOptions extends InputOptions<TValue>,
  TValue extends InputValue = InputValue
> = {
  [TKey in keyof TOptions]: InputDescriptor<ValueWrapper<TOptions[TKey]>>
}

export interface InputMethods {
  reset: () => void
}

export interface InputOptions<TValue extends InputValue = InputValue> {
  [name: string]: TValue
}

export type InputValue = string | number | boolean

export const useInputs = <
  TOptions extends InputOptions<TValue>,
  TValue extends InputValue = InputValue
>(
  options: TOptions
): [InputDescriptors<TOptions, TValue>, InputMethods] => {
  const [opt] = useState(() => options)

  const [descriptors, dispatch] = useReducer(reducer, undefined, () =>
    Object.keys(opt).reduce((current, key) => {
      const partial = buildDescriptorPartial(key, opt[key])
      const reset = (): void => dispatch(resetInput(key))
      const update = (value: InputValue): void =>
        dispatch(updateInput(key, value))

      return {
        ...current,
        [key]: {
          ...partial,
          reset,
          update,
        },
      }
    }, {})
  )

  const reset = (): void => {
    Object.keys(opt).forEach(key =>
      dispatch({
        type: 'reset',
        key,
      })
    )
  }

  return [
    descriptors,
    {
      reset,
    },
  ]
}

export const wrapInput = (
  descriptor: InputDescriptor<InputValue>
): DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> => ({
  id: descriptor.id,
  name: descriptor.name,
  [typeof descriptor.initialValue === 'boolean'
    ? 'checked'
    : 'value']: descriptor.value,
  onChange: e =>
    descriptor.update(
      typeof descriptor.initialValue === 'boolean'
        ? e.target.checked
        : typeof descriptor.initialValue === 'number'
        ? e.target.valueAsNumber
        : e.target.value
    ),
})
