import { Resolver } from 'src/helpers'
import { clonedField } from '../../../utils/cloneField/cloneField.performance'
import { springValueSetter } from '../../../utils/valueSetter/springValueSetter.performance'

export const opacityProps: Resolver = (state, entity) => {
  const key = state.keyOfEntity(entity)
  const opacitySetter = springValueSetter(state, key, 'opacity')

  return {
    opacity: clonedField(state, entity, 'opacity', 1),
    setOpacity: opacitySetter
  }
}
