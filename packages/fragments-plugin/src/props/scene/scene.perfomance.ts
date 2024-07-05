import { clonedField, Resolver } from 'src/helpers'
import { SpringValue } from '@react-spring/web'

export const sceneProps: Resolver = (state, entity) => {
  const key = state.keyOfEntity(entity)

  return {
    ...entity,
    visible: clonedField(state, entity, 'visible', new SpringValue(true)),
    // locked: clonedField(state, entity, 'locked', false),
    opacity: clonedField(state, entity, 'opacity', new SpringValue(1)),

    setOpacity(value: number) {
      // if (typeof value === 'number') { // or variale
      const currentOpacity = state.resolve(key).opacity
      if (currentOpacity) {
        currentOpacity.start(value)
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
        currentVisible.start(forceValue ?? !currentVisible.get())
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
