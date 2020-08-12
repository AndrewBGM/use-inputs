import { InputDescriptors, InputOptions, InputValue } from '.'

export interface ResetAction {
  type: 'reset'
  key: string
}

export interface UpdateAction {
  type: 'update'
  key: string
  value: InputValue
}

export type ReducerAction = ResetAction | UpdateAction

export const resetInput = (key: string): ResetAction => ({
  type: 'reset',
  key,
})

export const updateInput = (key: string, value: InputValue): UpdateAction => ({
  type: 'update',
  key,
  value,
})

export default <
  TDescriptors extends InputDescriptors<TOptions, TValue>,
  TOptions extends InputOptions<TValue>,
  TValue extends InputValue
>(
  state: TDescriptors,
  action: ReducerAction
): TDescriptors => {
  switch (action.type) {
    case 'reset':
      return {
        ...state,
        [action.key]: {
          ...state[action.key],
          value: state[action.key].initialValue,
        },
      }
    case 'update':
      return {
        ...state,
        [action.key]: {
          ...state[action.key],
          value: action.value,
        },
      }
    default:
      return state
  }
}
