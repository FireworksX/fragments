import { Resolver } from '../../../helpers'
import { getVariabledValue } from '../../../utils/getValue/getVariabledValue.performance'
import { clonedField } from '../../../utils/cloneField/cloneField.performance'

export const transformValueContains: Resolver = (state, entity) => {
  const key = state.keyOfEntity(entity)
  const value = clonedField(state, entity, 'value')

  return {
    ...entity,
    value,
    getUpdateConnectors$: () => [getVariabledValue(state, state.resolve(key).value)],
    transform: (inputValue): boolean => {
      return inputValue?.contains(state.resolve(key).value)
    }
  }
}