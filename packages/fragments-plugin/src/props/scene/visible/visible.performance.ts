import { Resolver } from 'src/helpers'
import { clonedField } from '../../../utils/cloneField/cloneField.performance'
import { SpringValue } from '@react-spring/web'

export const visibleProps: Resolver = (state, entity) => {
  const key = state.keyOfEntity(entity)

  const toggleVisible = (forceValue?: boolean) => {
    const visible$ = state.resolve(key).visible

    if (visible$) {
      visible$.set(forceValue ?? !visible$.get())
    } else {
      state.mutate(key, {
        visible: new SpringValue(false)
      })
    }
  }

  return {
    visible: clonedField(state, entity, 'visible', true),
    toggleVisible
  }
}
