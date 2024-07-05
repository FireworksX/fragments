import { clonedField, Resolver } from 'src/helpers'
import { LayerProps } from 'src/types/props'
import {
  builderLayerAlign,
  builderLayerDirection,
  builderLayerDistribute,
  builderLayerMode
} from 'src/index.performance'
import { SpringValue } from '@react-spring/web'

export const layerProps: Resolver = (state, entity): LayerProps => {
  const key = state.keyOfEntity(entity)

  return {
    ...entity,
    layerMode: clonedField(state, entity, 'layerMode', new SpringValue(builderLayerMode.none)),
    layerAlign: clonedField(state, entity, 'layerAlign', new SpringValue(builderLayerAlign.start)),
    layerDirection: clonedField(state, entity, 'layerDirection', new SpringValue(builderLayerDirection.horizontal)),
    layerDistribute: clonedField(state, entity, 'layerDistribute', new SpringValue(builderLayerDistribute.start)),
    layerWrap: clonedField(state, entity, 'layerWrap', new SpringValue(false)),
    layerGap: clonedField(state, entity, 'layerGap', new SpringValue(0)),

    setLayerMode(mode: typeof builderLayerMode) {
      if (Object.keys(builderLayerMode).includes(mode)) {
        const currentValue = state.resolve(key).layerMode
        currentValue.start(mode)
        // state.mutate(state.keyOfEntity(this), {
        //   layerMode: mode
        // })
      }
    },
    setLayerDirection(direction: typeof builderLayerDirection) {
      if (Object.keys(builderLayerDirection).includes(direction)) {
        const currentValue = state.resolve(key).layerDirection
        currentValue.start(direction)
        // state.mutate(state.keyOfEntity(this), {
        //   layerDirection: direction
        // })
      }
    },
    setLayerDistribute(distribute: typeof builderLayerDistribute) {
      if (Object.keys(builderLayerDistribute).includes(distribute)) {
        const currentValue = state.resolve(key).layerDistribute
        currentValue.start(distribute)
        // state.mutate(state.keyOfEntity(this), {
        //   layerDistribute: distribute
        // })
      }
    },
    setLayerAlign(align: typeof builderLayerAlign) {
      if (Object.keys(builderLayerAlign).includes(align)) {
        const currentValue = state.resolve(key).layerAlign
        currentValue.start(align)
        // state.mutate(state.keyOfEntity(this), {
        //   layerAlign: align
        // })
      }
    },
    setLayerWrap(isWrap: boolean) {
      if (typeof isWrap === 'boolean') {
        const currentValue = state.resolve(key).layerWrap
        currentValue.start(isWrap)
        // state.mutate(state.keyOfEntity(this), {
        //   layerWrap: isWrap
        // })
      }
    },
    setLayerGap(gap: number) {
      if (typeof gap === 'number') {
        const currentGap = state.resolve(key).layerGap
        if (currentGap) {
          currentGap.start(gap)
        }
      }
    }
  }
}
