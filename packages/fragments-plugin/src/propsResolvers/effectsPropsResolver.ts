import { clonedField, Resolver } from '../helpers'
import { Effect } from '@adstore/web/src/types/props'
import { builderEffectType } from 'src/defenitions'

export const effectsPropsResolver: Resolver = (state, entity) => {
  const key = state.keyOfEntity(entity)

  return {
    ...entity,
    effects: clonedField(state, entity, 'effects', []),
    setEffect(effect: Effect) {
      state.mutate(
        key,
        prev => {
          const effects = [...prev.effects]
          const effectIndex = prev.effects.findIndex(e => e.type === effect.type)

          if (effectIndex === -1) {
            effects.push(effect)
          } else {
            effects.splice(effectIndex, 1, effect)
          }

          return {
            effects
          }
        },
        {
          replace: true
        }
      )
    },
    removeEffect(type: keyof typeof builderEffectType) {
      state.mutate(key, prev => ({ effects: prev.effects.filter(e => e.type !== type) }), {
        replace: true
      })
    }
  }
}
