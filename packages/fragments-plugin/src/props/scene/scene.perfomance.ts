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
      currentOpacity.set(value)
      // state.mutate(key, {
      //   opacity: value
      // })
      // }
    },
    // toggleLock(forceValue?: boolean) {
    //   state.mutate(key, prev => ({
    //     locked: typeof forceValue === 'boolean' ? forceValue : !prev.locked
    //   }))
    // },
    toggleVisible(forceValue?: boolean) {
      const currentVisible = state.resolve(key).visible
      currentVisible.set(forceValue ?? !currentVisible.get())
    }
  }
}
