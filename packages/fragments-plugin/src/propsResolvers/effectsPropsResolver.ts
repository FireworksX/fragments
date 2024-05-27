import { clonedField, Resolver } from '../helpers'
import { keyOfEntity } from '@adstore/statex'
import { Effect } from '@adstore/web/src/types/props'
import { builderEffectType } from 'src/defenitions'

export const effectsPropsResolver: Resolver = (statex, entity) => {
  const key = keyOfEntity(entity)

  return {
    ...entity,
    effects: clonedField(statex, entity, 'effects', []),
    setEffect(effect: Effect) {
      statex.mutate(
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
      statex.mutate(key, prev => ({ effects: prev.effects.filter(e => e.type !== type) }), {
        replace: true
      })
    }
  }
}
