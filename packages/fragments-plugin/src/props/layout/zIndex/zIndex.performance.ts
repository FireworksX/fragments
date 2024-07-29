import { Resolver } from 'src/helpers'
import { clonedField } from '../../../utils/cloneField/cloneField.performance'
import { SpringValue } from '@react-spring/web'

export const zIndexProps: Resolver = (state, entity) => {
  const key = state.keyOfEntity(entity)

  const setZIndex = (value: number) => {
    if (typeof value !== 'number') {
      return
    }
    const localZIndex$ = state.resolve(key).zIndex
    const parentZIndex$ = state.resolveValue(key, 'zIndex')

    if (localZIndex$) {
      localZIndex$.set(value)
    } else {
      state.mutate(key, {
        zIndex: new SpringValue(parentZIndex$?.get() + 1 || 0)
      })
    }
  }

  return {
    zIndex: clonedField(state, entity, 'zIndex'),
    setZIndex
  }
}
