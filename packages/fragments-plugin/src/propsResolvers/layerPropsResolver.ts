import { clonedField, Resolver } from '../helpers'
import {
  builderLayerAlign,
  builderLayerDirection,
  builderLayerDistribute,
  builderLayerMode
} from '@adstore/web/src/data/promos/creators'
import { keyOfEntity } from '@adstore/statex'
import { LayerProps } from '../types/props'

export const layerPropsResolver: Resolver = (statex, entity): LayerProps => {
  const key = keyOfEntity(entity)

  return {
    ...entity,
    layerMode: clonedField(statex, entity, 'layerMode', builderLayerMode.none),
    layerAlign: clonedField(statex, entity, 'layerAlign', builderLayerAlign.start),
    layerDirection: clonedField(statex, entity, 'layerDirection', builderLayerDirection.horizontal),
    layerDistribute: clonedField(statex, entity, 'layerDistribute', builderLayerDistribute.start),
    layerWrap: clonedField(statex, entity, 'layerWrap', false),
    layerGap: clonedField(statex, entity, 'layerGap', 0),

    setLayerMode(mode: typeof builderLayerMode) {
      if (Object.keys(builderLayerMode).includes(mode)) {
        statex.mutate(keyOfEntity(this), {
          layerMode: mode
        })
      }
    },
    setLayerDirection(direction: typeof builderLayerDirection) {
      if (Object.keys(builderLayerDirection).includes(direction)) {
        statex.mutate(keyOfEntity(this), {
          layerDirection: direction
        })
      }
    },
    setLayerDistribute(distribute: typeof builderLayerDistribute) {
      if (Object.keys(builderLayerDistribute).includes(distribute)) {
        statex.mutate(keyOfEntity(this), {
          layerDistribute: distribute
        })
      }
    },
    setLayerAlign(align: typeof builderLayerAlign) {
      if (Object.keys(builderLayerAlign).includes(align)) {
        statex.mutate(keyOfEntity(this), {
          layerAlign: align
        })
      }
    },
    setLayerWrap(isWrap: boolean) {
      if (typeof isWrap === 'boolean') {
        statex.mutate(keyOfEntity(this), {
          layerWrap: isWrap
        })
      }
    },
    setLayerGap(gap: number) {
      if (typeof gap === 'number') {
        statex.mutate(keyOfEntity(this), {
          layerGap: gap
        })
      }
    }
  }
}
