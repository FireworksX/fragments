import { clonedField, Resolver } from '../helpers'
import { keyOfEntity } from '@adstore/statex'

export const scenePropsResolver: Resolver = (statex, entity) => {
  const key = keyOfEntity(entity)

  return {
    ...entity,
    visible: clonedField(statex, entity, 'visible', true),
    locked: clonedField(statex, entity, 'locked', false),
    opacity: clonedField(statex, entity, 'opacity', 1),

    setOpacity(value: number) {
      // if (typeof value === 'number') { // or variale
      statex.mutate(key, {
        opacity: value
      })
      // }
    },
    toggleLock(forceValue?: boolean) {
      statex.mutate(key, prev => ({
        locked: typeof forceValue === 'boolean' ? forceValue : !prev.locked
      }))
    },
    toggleVisible(forceValue?: boolean) {
      statex.mutate(key, prev => ({
        visible: forceValue ?? !prev.visible
      }))
    }
  }
}
