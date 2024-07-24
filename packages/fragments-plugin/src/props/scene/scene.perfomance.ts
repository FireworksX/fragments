import { Resolver } from 'src/helpers'
import { SpringValue } from '@react-spring/web'
import { clonedField } from 'src/utils/cloneField/cloneField.performance'

export const sceneProps: Resolver = (state, entity) => {
  const key = state.keyOfEntity(entity)

  return {
    ...entity,
    visible: clonedField(state, entity, 'visible', true),
    // locked: clonedField(state, entity, 'locked', false),
    opacity: clonedField(state, entity, 'opacity', 1),

    setOpacity(value: number) {
      // if (typeof value === 'number') { // or variale
      const currentOpacity = state.resolve(key).opacity
      if (currentOpacity) {
        currentOpacity.set(value)
      } else {
        state.mutate(key, {
          opacity: new SpringValue(1)
        })
      }
      // state.mutate(key, {
      //   opacity: value
      // })
      // }
    },
    // toggleLock(forceValue?: boolean) {0
    //   state.mutate(key, prev => ({
    //     locked: typeof forceValue === 'boolean' ? forceValue : !prev.locked
    //   }))
    // },
    toggleVisible(forceValue?: boolean) {
      const currentVisible = state.resolve(key).visible

      if (currentVisible) {
        currentVisible.set(forceValue ?? !currentVisible.get())
      } else {
        state.mutate(key, {
          visible: new SpringValue(false)
        })
      }

      // state.mutate(key, prev => ({
      //   visible: forceValue ?? !prev.visible
      // }))
    }
  }
}
