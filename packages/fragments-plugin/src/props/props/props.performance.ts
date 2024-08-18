import { Resolver } from 'src/helpers'
import { clonedField } from 'src/utils/cloneField/cloneField.performance'
import { Entity } from '@graph-state/core'

export const props: Resolver = (state, entity: any) => {
  const key = state.keyOfEntity(entity)

  return {
    ...entity,
    props: clonedField(state, entity, 'props', []),
    addProp: variable => {
      state.mutate(key, {
        props: [variable]
      })
    },
    removeProp: (prop: Entity) => {
      const removeKey = state.keyOfEntity(prop)
      // state.mutate(
      //   key,
      //   prev => ({
      //     props: prev.props.filter(v => removeKey !== v)
      //   }),
      //   { replace: true }
      // )
      state.invalidate(removeKey)
    }
  }
}
