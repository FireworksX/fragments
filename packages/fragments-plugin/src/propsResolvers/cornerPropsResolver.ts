import { clonedField, Resolver } from '../helpers'
import { keyOfEntity } from '@adstore/statex'
import { isValue } from '@adstore/utils'

const isValidValue = (value: any) => typeof value === 'number'

export const cornerPropsResolver: Resolver = (statex, entity) => {
  const key = keyOfEntity(entity)
  const isMixed = [entity.topLeftRadius, entity.topRightRadius, entity.bottomLeftRadius, entity.bottomRightRadius].some(
    value => isValue(value) && value !== statex.override && value > 0
  )

  return {
    ...entity,
    cornerRadius: clonedField(statex, entity, 'cornerRadius', isMixed ? statex.mixed : 0),
    topLeftRadius: clonedField(statex, entity, 'topLeftRadius', isMixed ? statex.mixed : 0),
    topRightRadius: clonedField(statex, entity, 'topRightRadius', isMixed ? statex.mixed : 0),
    bottomLeftRadius: clonedField(statex, entity, 'bottomLeftRadius', isMixed ? statex.mixed : 0),
    bottomRightRadius: clonedField(statex, entity, 'bottomRightRadius', isMixed ? statex.mixed : 0),

    setCornerRadius(...args) {
      const isMixed = args.length > 1

      if (isMixed) {
        if (typeof args[0] === 'string' && isValidValue(args[1])) {
          statex.mutate(key, {
            cornerRadius: statex.mixed,
            [`${args[0]}Radius`]: isValidValue(args[1]) ? args[1] ?? 0 : 0
          })
        }
      } else {
        statex.mutate(key, {
          cornerRadius: isValidValue(args[0]) ? args[0] ?? 0 : 0
        })
      }
    }
  }
}
