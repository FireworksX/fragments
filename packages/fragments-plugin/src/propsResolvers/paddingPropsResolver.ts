import { clonedField, Resolver } from '../helpers'
import { isValue } from '@adstore/utils'
import { keyOfEntity } from '@adstore/statex'
import { capitalize } from '@adstore/web/src/utils/helpers'
import { PaddingProps } from '../types/props'

const isValidValue = (value: any) => typeof value === 'number'

export const paddingPropsResolver: Resolver = (statex, entity): PaddingProps => {
  const key = keyOfEntity(entity)
  const isMixed = [entity.paddingLeft, entity.paddingRight, entity.paddingTop, entity.paddingBottom].some(
    value => isValue(value) && value !== statex.override && value > 0
  )

  return {
    ...entity,
    padding: clonedField(statex, entity, 'padding', isMixed ? statex.mixed : 0),
    paddingLeft: clonedField(statex, entity, 'paddingLeft', isMixed ? statex.mixed : 0),
    paddingRight: clonedField(statex, entity, 'paddingRight', isMixed ? statex.mixed : 0),
    paddingTop: clonedField(statex, entity, 'paddingTop', isMixed ? statex.mixed : 0),
    paddingBottom: clonedField(statex, entity, 'paddingBottom', isMixed ? statex.mixed : 0),

    setPadding(...args) {
      const isMixed = args.length > 1

      if (isMixed) {
        if (typeof args[0] === 'string' && isValidValue(args[1])) {
          statex.mutate(key, {
            padding: statex.mixed,
            [`padding${capitalize(args[0])}`]: isValidValue(args[1]) ? args[1] ?? 0 : 0
          })
        }
      } else {
        statex.mutate(key, {
          padding: isValidValue(args[0]) ? args[0] ?? 0 : 0
        })
      }
    }
  }
}
