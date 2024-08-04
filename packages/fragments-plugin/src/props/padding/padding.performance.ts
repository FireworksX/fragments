import { Resolver } from 'src/helpers'
import { PaddingProps } from 'src/types/props'
import { clonedField } from 'src/utils/cloneField/cloneField.performance'
import { SpringValue, to } from '@react-spring/web'

export const paddingProps: Resolver = (state, entity: any): PaddingProps => {
  const key = state.keyOfEntity(entity)
  const isMixedPadding = () => {
    const value$ = state.resolveValue(key, 'padding')
    return to(value$, v => v === -1)
  }

  const setPadding = (fieldKey: string, value: number) => {
    const valuePadding$ = state.resolve(key)[fieldKey]

    if (valuePadding$) {
      valuePadding$.set(value)
    } else {
      state.mutate(key, {
        [fieldKey]: new SpringValue(value)
      })
    }
  }

  return {
    ...entity,
    padding: clonedField(state, entity, 'padding', 0),
    paddingLeft: clonedField(state, entity, 'paddingLeft', 0),
    paddingRight: clonedField(state, entity, 'paddingRight', 0),
    paddingTop: clonedField(state, entity, 'paddingTop', 0),
    paddingBottom: clonedField(state, entity, 'paddingBottom', 0),
    isMixedPadding,

    setPadding(...args) {
      const isSide = args.length > 1
      const side = isSide ? args[0] : undefined
      const value = isSide ? args[1] : args[0]

      if (isSide) {
        setPadding('padding', -1)
        const fieldKeyMap = {
          top: 'paddingTop',
          right: 'paddingRight',
          bottom: 'paddingBottom',
          left: 'paddingLeft'
        }
        setPadding(fieldKeyMap[side], value)
      } else {
        setPadding('padding', value)
      }
    }
  }
}
