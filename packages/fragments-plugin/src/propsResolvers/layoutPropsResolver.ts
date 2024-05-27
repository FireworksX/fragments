import { builderConstrain, builderSizing } from 'src/defenitions'
import { keyOfEntity } from '@adstore/statex'
import { clonedField, Resolver } from '../helpers'

export const layoutPropsResolver: Resolver = (graphState, entity) => {
  const key = keyOfEntity(entity)

  return {
    ...entity,
    x: clonedField(graphState, entity, 'x', 0),
    y: clonedField(graphState, entity, 'y', 0),
    aspectRatio: clonedField(graphState, entity, 'aspectRatio'),
    zIndex: clonedField(graphState, entity, 'zIndex'),
    width: clonedField(graphState, entity, 'width', 100),
    height: clonedField(graphState, entity, 'height', 100),
    rotation: clonedField(graphState, entity, 'rotation', 0),
    layoutSizingHorizontal: clonedField(graphState, entity, 'layoutSizingHorizontal', builderSizing.Fixed),
    layoutSizingVertical: clonedField(graphState, entity, 'layoutSizingVertical', builderSizing.Fixed),
    constrains: clonedField(graphState, entity, 'constrains', {
      vertical: entity?.constrains?.vertical ?? builderConstrain.Center,
      horizontal: entity?.constrains?.horizontal ?? builderConstrain.Center
    }),

    syncSize() {
      graphState.mutate(key, prev => {
        return {
          aspectRatio: prev.aspectRatio === graphState.empty ? prev.height / prev.width : graphState.empty
        }
      })
    },
    setZIndex(value: number) {
      if (typeof value !== 'number') {
        return
      }

      graphState.mutate(key, {
        zIndex: value
      })
    },
    setWidth(value: number) {
      if (typeof value !== 'number') {
        return
      }

      const aspectRatio = graphState.resolveValue(key, 'aspectRatio')
      const height = graphState.resolveValue(key, 'height')

      if (aspectRatio === graphState.empty || !aspectRatio) {
        graphState.mutate(key, {
          width: value
        })
      } else {
        graphState.mutate(key, {
          width: value,
          height: aspectRatio !== graphState.empty ? +(value * aspectRatio).toFixed(1) : height
        })
      }
    },
    setHeight(value: number) {
      if (typeof value !== 'number') {
        return
      }

      const aspectRatio = graphState.resolveValue(key, 'aspectRatio')
      const width = graphState.resolveValue(key, 'width')

      if (aspectRatio === graphState.empty || !aspectRatio) {
        graphState.mutate(key, {
          height: value
        })
      } else {
        graphState.mutate(key, prev => ({
          height: value,
          width: aspectRatio !== graphState.empty ? +(value / prev.aspectRatio).toFixed(2) : width
        }))
      }
    },
    rotate(deg: number) {
      if (typeof deg !== 'number') {
        return
      }

      graphState.mutate(key, {
        rotation: deg
      })
    },
    move(x: number, y: number) {
      if (typeof x !== 'number' || typeof y !== 'number') {
        return
      }

      graphState.mutate(key, {
        x,
        y
      })
    },
    setSizeMode(mode: 'horizontal' | 'vertical', value: typeof builderSizing) {
      if (Object.keys(builderSizing).includes(value)) {
        if (mode === 'horizontal') {
          graphState.mutate(key, {
            layoutSizingHorizontal: value
          })
        }
        if (mode === 'vertical') {
          graphState.mutate(key, {
            layoutSizingVertical: value
          })
        }
      }
    },
    setConstrains(mode: 'horizontal' | 'vertical', value: typeof builderConstrain) {
      if (Object.keys(builderConstrain).includes(value)) {
        if (mode === 'horizontal' || mode === 'vertical') {
          graphState.mutate(key, prev => ({
            constrains: {
              ...prev.constrains,
              [mode]: value
            }
          }))
        }
      }
    }
  }
}
