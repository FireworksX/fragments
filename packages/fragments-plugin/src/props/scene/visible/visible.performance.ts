import { Resolver } from 'src/helpers'
import { clonedField } from '../../../utils/cloneField/cloneField.performance'
import { springValueSetter } from '../../../utils/valueSetter/springValueSetter.performance'

export const visibleProps: Resolver = (state, entity) => {
  const key = state.keyOfEntity(entity)
  const visibleSetter = springValueSetter(state, key, 'visible')

  const toggleVisible = (forceValue?: boolean) => {
    const visible$ = state.resolve(key).visible
    if (visible$) {
      visibleSetter(forceValue ?? !visible$.get())
    } else {
      visibleSetter(false)
    }
  }

  return {
    visible: clonedField(state, entity, 'visible', true),
    toggleVisible
  }
}
