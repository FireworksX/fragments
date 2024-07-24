import { isValue } from '@fragments/utils'
import { OVERRIDE, Resolver } from 'src/helpers'
import { PaddingProps } from 'src/types/props'
import { clonedField } from 'src/utils/cloneField/cloneField.performance'

const isValidValue = (value: any) => typeof value === 'number'

export const paddingProps: Resolver = (state, entity: any): PaddingProps => {
  const key = state.keyOfEntity(entity)
  const isMixed = [entity.paddingLeft, entity.paddingRight, entity.paddingTop, entity.paddingBottom].some(
    value => isValue(value) && value !== OVERRIDE && value > 0
  )

  return {
    ...entity,
    padding: clonedField(state, entity, 'padding', isMixed ? state.mixed : 0),
    paddingLeft: clonedField(state, entity, 'paddingLeft', isMixed ? state.mixed : 0),
    paddingRight: clonedField(state, entity, 'paddingRight', isMixed ? state.mixed : 0),
    paddingTop: clonedField(state, entity, 'paddingTop', isMixed ? state.mixed : 0),
    paddingBottom: clonedField(state, entity, 'paddingBottom', isMixed ? state.mixed : 0),

    setPadding(...args) {
      const isMixed = args.length > 1

      if (isMixed) {
        if (typeof args[0] === 'string' && isValidValue(args[1])) {
          state.mutate(key, {
            padding: state.mixed
            // [`padding${capitalize(args[0])}`]: isValidValue(args[1]) ? args[1] ?? 0 : 0
          })
        }
      } else {
        const currentPadding = state.resolve(key).padding
        currentPadding.set(isValidValue(args[0]) ? args[0] ?? 0 : 0)
        // state.mutate(key, {
        //   padding: isValidValue(args[0]) ? args[0] ?? 0 : 0
        // })
      }
    }
  }
}
