import { Resolver } from '../../../helpers'
import { clonedField } from '../../../utils/cloneField/cloneField.performance'
import { getStaticValue } from '../../../utils/getValue/getStaticValue.performance'
import { getVariabledValue } from '../../../utils/getValue/getVariabledValue.performance'

export const transformValueEquals: Resolver = (state, entity) => {
  const key = state.keyOfEntity(entity)
  const value = clonedField(state, entity, 'value')

  return {
    ...entity,
    value,
    getUpdateConnectors$: () => [getVariabledValue(state, state.resolve(key).value)],
    transform: (inputValue): boolean => {
      const value = getStaticValue(state, state.resolve(key).value)
      return value === inputValue
    }
  }
}
