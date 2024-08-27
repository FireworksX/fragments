import { Resolver } from '../../../helpers'
import { isValue } from '@fragments/utils'
import { clonedField } from '../../../utils/cloneField/cloneField.performance'
import { getVariabledValue } from '../../../utils/getValue/getVariabledValue.performance'

export const transformValueExists: Resolver = (state, entity) => {
  const key = state.keyOfEntity(entity)
  const value = clonedField(state, entity, 'value')

  return {
    ...entity,
    value,
    getUpdateConnectors$: () => [getVariabledValue(state, state.resolve(key).value)],
    transform: (inputValue): boolean => {
      return isValue(inputValue)
    }
  }
}
