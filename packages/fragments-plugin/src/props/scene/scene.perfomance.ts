import { Resolver } from 'src/helpers'
import { opacityProps } from './opacity/opacity.performance'
import { visibleProps } from './visible/visible.performance'

export const sceneProps: Resolver = (state, entity) => {
  const key = state.keyOfEntity(entity)
  const opacity = opacityProps(state, entity)
  const visible = visibleProps(state, entity)

  return {
    ...entity,
    ...opacity,
    ...visible
  }
}
