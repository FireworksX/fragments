import { builderConstrain, builderSizing } from 'src/defenitions'
import { Resolver } from 'src/helpers'
import { SpringValue } from '@react-spring/web'
import { clonedField } from 'src/utils/cloneField/cloneField.performance'
import { aspectRatio } from './aspectRatio/aspectRatio.performance'

export const layoutProps: Resolver = (state, entity) => {
  const key = state.keyOfEntity(entity)

  const ratio = aspectRatio(state, entity)

  return {
    ...entity,
    x: clonedField(state, entity, 'x', 0),
    y: clonedField(state, entity, 'y', 0),
    ...ratio,
    zIndex: clonedField(state, entity, 'zIndex'),
    width: clonedField(state, entity, 'width', 100),
    height: clonedField(state, entity, 'height', 100),
    rotation: clonedField(state, entity, 'rotation', 0),
    layoutSizingHorizontal: clonedField(state, entity, 'layoutSizingHorizontal', builderSizing.Fixed),
    layoutSizingVertical: clonedField(state, entity, 'layoutSizingVertical', builderSizing.Fixed),
    // constrains: clonedField(state, entity, 'constrains', {
    //   vertical: entity?.constrains?.vertical ?? builderConstrain.Center,
    //   horizontal: entity?.constrains?.horizontal ?? builderConstrain.Center
    // }),
    //
    // syncSize() {
    //   state.mutate(key, prev => ({
    //     aspectRatio: prev.aspectRatio === null ? prev.height.get() / prev.width.get() : null
    //   }))
    // },
    setZIndex(value: number) {
      if (typeof value !== 'number') {
        return
      }
      const currentZindex = state.resolve(key).zIndex
      if (currentZindex) {
        currentZindex.set(value)
      } else {
        state.mutate(key, {
          zIndex: new SpringValue(0)
        })
      }
    },
    setWidth(value: number) {
      if (typeof value !== 'number') {
        return
      }

      const aspectRatio = state.resolveValue(key, 'aspectRatio')
      const height = state.resolveValue(key, 'height')
      const width = state.resolveValue(key, 'width')

      if (aspectRatio === null || !aspectRatio) {
        width.set(value)
        // state.mutate(key, {
        //   width: value
        // })
      } else {
        width.set(value)
        height.set(aspectRatio !== null ? +(value * aspectRatio).toFixed(1) : height.get())
        // state.mutate(key, {
        //   width: value,
        //   height: aspectRatio !== null ? +(value * aspectRatio).toFixed(1) : height
        // })
      }
    },
    setHeight(value: number) {
      if (typeof value !== 'number') {
        return
      }

      const aspectRatio = state.resolveValue(key, 'aspectRatio')
      const width = state.resolveValue(key, 'width')
      const height = state.resolveValue(key, 'height')

      if (aspectRatio === null || !aspectRatio) {
        height.set(value)
        // state.mutate(key, {
        //   height: value
        // })
      } else {
        height.set(value)
        width.set(aspectRatio !== null ? +(value / aspectRatio).toFixed(2) : width.get())
        // state.mutate(key, prev => ({
        //   height: value,
        //   width: aspectRatio !== null ? +(value / prev.aspectRatio).toFixed(2) : width
        // }))
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
          const currentHorizontalSizing = state.resolve(key).layoutSizingHorizontal
          currentHorizontalSizing.set(value)
        }
        if (mode === 'vertical') {
          const currentVerticalSizing = state.resolve(key).layoutSizingVertical
          currentVerticalSizing.set(value)
          // state.mutate(key, {
          //   layoutSizingVertical: value
          // })
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
