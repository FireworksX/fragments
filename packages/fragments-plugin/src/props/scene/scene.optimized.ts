import { clonedField, Resolver } from 'src/helpers'

export const sceneProps: Resolver = (state, entity) => {
  const key = state.keyOfEntity(entity)

  return {
    ...entity,
    // visible: clonedField(state, entity, 'visible', true),
    // locked: clonedField(state, entity, 'locked', false),
    opacity: clonedField(state, entity, 'opacity', 1),

    setOpacity(value: number) {
      // if (typeof value === 'number') { // or variale
      state.mutate(key, {
        opacity: value
      })
      // }
    }
    // toggleLock(forceValue?: boolean) {
    //   state.mutate(key, prev => ({
    //     locked: typeof forceValue === 'boolean' ? forceValue : !prev.locked
    //   }))
    // },
    // toggleVisible(forceValue?: boolean) {
    //   state.mutate(key, prev => ({
    //     visible: forceValue ?? !prev.visible
    //   }))
    // }
  }
}
