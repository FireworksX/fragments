import { clonedField, OVERRIDE, Resolver } from '../helpers'
import { keyOfEntity } from '@adstore/statex'
import { isValue } from '@adstore/utils'

const isValidValue = (value: any) => typeof value === 'number'

export const cornerPropsResolver: Resolver = (state, entity) => {
  const key = keyOfEntity(entity)
  const isMixed = [entity.topLeftRadius, entity.topRightRadius, entity.bottomLeftRadius, entity.bottomRightRadius].some(
    value => isValue(value) && value !== OVERRIDE && value > 0
  )

  return {
    ...entity,
    cornerRadius: clonedField(state, entity, 'cornerRadius', isMixed ? state.mixed : 0),
    topLeftRadius: clonedField(state, entity, 'topLeftRadius', isMixed ? state.mixed : 0),
    topRightRadius: clonedField(state, entity, 'topRightRadius', isMixed ? state.mixed : 0),
    bottomLeftRadius: clonedField(state, entity, 'bottomLeftRadius', isMixed ? state.mixed : 0),
    bottomRightRadius: clonedField(state, entity, 'bottomRightRadius', isMixed ? state.mixed : 0),

    setCornerRadius(...args) {
      const isMixed = args.length > 1

      if (isMixed) {
        if (typeof args[0] === 'string' && isValidValue(args[1])) {
          state.mutate(key, {
            cornerRadius: state.mixed,
            [`${args[0]}Radius`]: isValidValue(args[1]) ? args[1] ?? 0 : 0
          })
        }
      } else {
        state.mutate(key, {
          cornerRadius: isValidValue(args[0]) ? args[0] ?? 0 : 0
        })
      }
    }
  }
}
