import { Resolver } from '../../../helpers'
import { isValue } from '@fragments/utils'
import { clonedField } from '../../../utils/cloneField/cloneField.performance'
import { getVariabledValue } from '../../../utils/getValue/getVariabledValue.performance'
import { getStaticValue } from '../../../utils/getValue/getStaticValue.performance'

export const convertFromBooleanTransformValue: Resolver = (state, entity) => {
  const key = state.keyOfEntity(entity)
  const truthy = clonedField(state, entity, 'truthy')
  const falsy = clonedField(state, entity, 'falsy')

  return {
    ...entity,
    truthy,
    falsy,
    getUpdateConnectors$: () => [
      getVariabledValue(state, state.resolve(key).truthy),
      getVariabledValue(state, state.resolve(key).falsy)
    ],
    transform: (inputValue: boolean): unknown => {
      const node = state.resolve(key)
      return inputValue ? getStaticValue(state, node.truthy) : getStaticValue(state, node.falsy)
    }
  }
}
