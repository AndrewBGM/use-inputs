import { InputDescriptor, InputValue } from '.'
import { generateId } from './generate-id'

export const buildDescriptorPartial = <TValue extends InputValue = InputValue>(
  key: string,
  value: TValue
): Omit<InputDescriptor<TValue>, 'reset' | 'update'> => ({
  id: generateId(),
  initialValue: value,
  name: key,
  value,
})
