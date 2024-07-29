import { builderConstrain, builderSizing } from 'src/defenitions'
import { Resolver } from 'src/helpers'
import { SpringValue } from '@react-spring/web'
import { clonedField } from 'src/utils/cloneField/cloneField.performance'
import { aspectRatioProps } from './aspectRatio/aspectRatioProps.performance'
import { sizeProps } from './size/sizeProps.performance'
import { zIndexProps } from './zIndex/zIndex.performance'
import { sizingProps } from './sizing/sizing.performance'

export const layoutProps: Resolver = (state, entity) => {
  const key = state.keyOfEntity(entity)

  const aspectRatio = aspectRatioProps(state, entity)
  const size = sizeProps(state, entity)
  const zIndex = zIndexProps(state, entity)
  const sizing = sizingProps(state, entity)

  return {
    ...entity,
    x: clonedField(state, entity, 'x', 0),
    y: clonedField(state, entity, 'y', 0),
    ...aspectRatio,
    ...size,
    ...zIndex,
    ...sizing,
    rotation: clonedField(state, entity, 'rotation', 0),

    rotate(deg: number) {
      if (typeof deg !== 'number') {
        return
      }

      state.mutate(key, {
        rotation: deg
      })
    },
    move(x: number, y: number) {
      if (typeof x !== 'number' || typeof y !== 'number') {
        return
      }

      state.mutate(key, {
        x,
        y
      })
    }
  }
}
