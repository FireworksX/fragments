import { Resolver } from 'src/helpers'
import { clonedField } from '../../../utils/cloneField/cloneField.performance'
import { SpringValue } from '@react-spring/web'
import { builderSizing } from 'src'

const DEFAULT_SIZING = builderSizing.Fixed

export const sizingProps: Resolver = (state, entity) => {
  const key = state.keyOfEntity(entity)

  const setSizeMode = (mode: 'horizontal' | 'vertical', value: typeof builderSizing) => {
    if (Object.keys(builderSizing).includes(value)) {
      if (mode === 'horizontal') {
        const localSizing$ = state.resolve(key).layoutSizingHorizontal
        if (localSizing$) {
          localSizing$.set(value)
        } else {
          state.mutate(key, {
            layoutSizingHorizontal: new SpringValue(mode)
          })
        }
      }
      if (mode === 'vertical') {
        const localSizing$ = state.resolve(key).layoutSizingVertical
        if (localSizing$) {
          localSizing$.set(value)
        } else {
          state.mutate(key, {
            layoutSizingVertical: new SpringValue(mode)
          })
        }
      }
    }
  }
  return {
    layoutSizingHorizontal: clonedField(state, entity, 'layoutSizingHorizontal', DEFAULT_SIZING),
    layoutSizingVertical: clonedField(state, entity, 'layoutSizingVertical', DEFAULT_SIZING),
    setSizeMode
  }
}
