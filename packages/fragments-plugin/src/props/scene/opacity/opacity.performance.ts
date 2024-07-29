import { Resolver } from 'src/helpers'
import { clonedField } from '../../../utils/cloneField/cloneField.performance'
import { SpringValue } from '@react-spring/web'

export const opacityProps: Resolver = (state, entity) => {
  const key = state.keyOfEntity(entity)

  const setOpacity = (value: number) => {
    const opacity$ = state.resolve(key).opacity
    if (opacity$) {
      opacity$.set(value)
    } else {
      state.mutate(key, {
        opacity: new SpringValue(value)
      })
    }
  }

  return {
    opacity: clonedField(state, entity, 'opacity', 1),
    setOpacity
  }
}
