import { builderConstrain, builderSizing } from 'src/defenitions'
import { clonedField, Resolver } from '../helpers'

export const layoutPropsResolver: Resolver = (state, entity) => {
  const key = state.keyOfEntity(entity)

  return {
    ...entity,
    x: clonedField(state, entity, 'x', 0),
    y: clonedField(state, entity, 'y', 0),
    aspectRatio: clonedField(state, entity, 'aspectRatio'),
    zIndex: clonedField(state, entity, 'zIndex'),
    width: clonedField(state, entity, 'width', 100),
    height: clonedField(state, entity, 'height', 100),
    rotation: clonedField(state, entity, 'rotation', 0),
    layoutSizingHorizontal: clonedField(state, entity, 'layoutSizingHorizontal', builderSizing.Fixed),
    layoutSizingVertical: clonedField(state, entity, 'layoutSizingVertical', builderSizing.Fixed),
    constrains: clonedField(state, entity, 'constrains', {
      vertical: entity?.constrains?.vertical ?? builderConstrain.Center,
      horizontal: entity?.constrains?.horizontal ?? builderConstrain.Center
    }),

    syncSize() {
      state.mutate(key, prev => ({ aspectRatio: prev.aspectRatio === null ? prev.height / prev.width : null }))
    },
    setZIndex(value: number) {
      if (typeof value !== 'number') {
        return
      }

      state.mutate(key, {
        zIndex: value
      })
    },
    setWidth(value: number) {
      if (typeof value !== 'number') {
        return
      }

      const aspectRatio = state.resolveValue(key, 'aspectRatio')
      const height = state.resolveValue(key, 'height')

      if (aspectRatio === null || !aspectRatio) {
        state.mutate(key, {
          width: value
        })
      } else {
        state.mutate(key, {
          width: value,
          height: aspectRatio !== null ? +(value * aspectRatio).toFixed(1) : height
        })
      }
    },
    setHeight(value: number) {
      if (typeof value !== 'number') {
        return
      }

      const aspectRatio = state.resolveValue(key, 'aspectRatio')
      const width = state.resolveValue(key, 'width')

      if (aspectRatio === null || !aspectRatio) {
        state.mutate(key, {
          height: value
        })
      } else {
        state.mutate(key, prev => ({
          height: value,
          width: aspectRatio !== null ? +(value / prev.aspectRatio).toFixed(2) : width
        }))
      }
    },
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
    },
    setSizeMode(mode: 'horizontal' | 'vertical', value: typeof builderSizing) {
      if (Object.keys(builderSizing).includes(value)) {
        if (mode === 'horizontal') {
          state.mutate(key, {
            layoutSizingHorizontal: value
          })
        }
        if (mode === 'vertical') {
          state.mutate(key, {
            layoutSizingVertical: value
          })
        }
      }
    },
    setConstrains(mode: 'horizontal' | 'vertical', value: typeof builderConstrain) {
      if (Object.keys(builderConstrain).includes(value)) {
        if (mode === 'horizontal' || mode === 'vertical') {
          state.mutate(key, prev => ({
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
