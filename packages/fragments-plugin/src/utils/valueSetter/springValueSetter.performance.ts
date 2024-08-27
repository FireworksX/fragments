import { SpringValue } from '@react-spring/web'
import { GraphState, LinkKey } from '@graph-state/core'
import { isVariableLink } from '../isVariableLink'

export const springValueSetter =
  (state: GraphState, entityLinkKey: LinkKey, fieldKey: string) =>
  <TValue = unknown | LinkKey>(value: TValue) => {
    const resolveValue = state.resolve(entityLinkKey)[fieldKey]
    const isVariableValue = isVariableLink(value)

    if (isVariableValue) {
      state.mutate(entityLinkKey, current => {
        /*
        Если меняем одну переменную на другую переменную, то в
        _${field} всегда должно оставаться изначальное значение
         */
        const saveValue = isVariableLink(current[fieldKey]) ? current[`_${fieldKey}`] : current[fieldKey]
        return {
          [fieldKey]: value,
          [`_${fieldKey}`]: saveValue
        }
      })
      return
    }

    if (resolveValue && resolveValue instanceof SpringValue) {
      resolveValue.set(value)
    } else {
      state.mutate(entityLinkKey, {
        [fieldKey]: new SpringValue(value)
      })
    }
  }
