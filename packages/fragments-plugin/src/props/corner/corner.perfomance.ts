import { Resolver } from 'src/helpers'
import { SpringValue, to } from '@react-spring/web'
import { clonedField } from 'src/utils/cloneField/cloneField.performance'

export const cornerProps: Resolver = (state, entity: any) => {
  const key = state.keyOfEntity(entity)

  const isMixedRadius = () => {
    const value$ = state.resolveValue(key, 'cornerRadius')
    return to(value$, v => v === -1)
  }

  const setRadius = (fieldKey: string, value: number) => {
    const valueRadius$ = state.resolve(key)[fieldKey]

    if (valueRadius$) {
      valueRadius$.set(value)
    } else {
      state.mutate(key, {
        [fieldKey]: new SpringValue(value)
      })
    }
  }

  return {
    ...entity,
    cornerRadius: clonedField(state, entity, 'cornerRadius', 0),
    topLeftRadius: clonedField(state, entity, 'topLeftRadius', 0),
    topRightRadius: clonedField(state, entity, 'topRightRadius', 0),
    bottomLeftRadius: clonedField(state, entity, 'bottomLeftRadius', 0),
    bottomRightRadius: clonedField(state, entity, 'bottomRightRadius', 0),
    isMixedRadius,

    setCornerRadius(...args) {
      const isSide = args.length > 1
      const side = isSide ? args[0] : undefined
      const value = isSide ? args[1] : args[0]

      if (isSide) {
        setRadius('cornerRadius', -1)
        const fieldKeyMap = {
          tl: 'topLeftRadius',
          tr: 'topRightRadius',
          bl: 'bottomLeftRadius',
          br: 'bottomRightRadius'
        }
        setRadius(fieldKeyMap[side], value)
      } else {
        setRadius('cornerRadius', value)
      }
    }
  }
}
