import { Resolver } from 'src/helpers'
import { LayerProps } from 'src/types/props'
import {
  builderLayerAlign,
  builderLayerDirection,
  builderLayerDistribute,
  builderLayerMode
} from 'src/index.performance'
import { SpringValue } from '@react-spring/web'
import { clonedField } from 'src/utils/cloneField/cloneField.performance'

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
        const currentValue$ = state.resolve(key).layerMode

        if (currentValue$) {
          currentValue$.set(mode)
        } else {
          state.mutate(key, {
            layerMode: new SpringValue(mode)
          })
        }
      }
    },
    setLayerDirection(direction: typeof builderLayerDirection) {
      if (Object.keys(builderLayerDirection).includes(direction)) {
        const currentValue$ = state.resolve(key).layerDirection
        if (currentValue$) {
          currentValue$.set(direction)
        } else {
          state.mutate(key, {
            layerDirection: new SpringValue(direction)
          })
        }
      }
    },
    setLayerDistribute(distribute: typeof builderLayerDistribute) {
      if (Object.keys(builderLayerDistribute).includes(distribute)) {
        const currentValue$ = state.resolve(key).layerDistribute
        if (currentValue$) {
          currentValue$.set(distribute)
        } else {
          state.mutate(key, {
            layerDistribute: new SpringValue(distribute)
          })
        }
      }
    },
    setLayerAlign(align: typeof builderLayerAlign) {
      if (Object.keys(builderLayerAlign).includes(align)) {
        const currentValue$ = state.resolve(key).layerAlign
        if (currentValue$) {
          currentValue$.set(align)
        } else {
          state.mutate(key, {
            layerAlign: new SpringValue(align)
          })
        }
      }
    },
    setLayerWrap(isWrap: boolean) {
      if (typeof isWrap === 'boolean') {
        const currentValue$ = state.resolve(key).layerWrap
        if (currentValue$) {
          currentValue$.set(isWrap)
        } else {
          state.mutate(key, {
            layerAlign: new SpringValue(isWrap)
          })
        }
      }
    },
    setLayerGap(gap: number) {
      if (typeof gap === 'number') {
        const currentValue$ = state.resolve(key).layerGap

        if (currentValue$) {
          currentValue$.set(gap)
        } else {
          state.mutate(key, {
            layerGap: new SpringValue(gap)
          })
        }
      }
    }
  }
}
