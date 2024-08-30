import { Resolver } from '../../../helpers'
import { isValue } from '@fragments/utils'
import { clonedField } from '../../../utils/cloneField/cloneField.performance'
import { getVariabledValue } from '../../../utils/getValue/getVariabledValue.performance'
import { getStaticValue } from '../../../utils/getValue/getStaticValue.performance'

type Mode = 'gt' | 'gte' | 'lt' | 'lte'

export const transformValueValueSize =
  (mode: Mode): Resolver =>
  (state, entity) => {
    const key = state.keyOfEntity(entity)
    const value = clonedField(state, entity, 'value')

    return {
      ...entity,
      value,
      getUpdateConnectors$: () => [getVariabledValue(state, state.resolve(key).value)],
      transform: (inputValue): boolean => {
        const value = getStaticValue(state, state.resolve(key).value)
        if (mode === 'gt') return inputValue > value
        if (mode === 'gte') return inputValue >= value
        if (mode === 'lt') return inputValue < value
        if (mode === 'lte') return inputValue <= value

        return false
      }
    }
  }
