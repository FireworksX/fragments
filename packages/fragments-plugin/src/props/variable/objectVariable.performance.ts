import { Resolver } from 'src/helpers'
import { clonedField } from 'src/utils/cloneField/cloneField.performance'
import { builderVariableType } from 'src'
import { Entity } from '@graph-state/core'

export const objectVariable: Resolver = (state, entity: any) => {
  const key = state.keyOfEntity(entity)

  return {
    ...entity,
    name: clonedField(state, entity, 'name', entity._id, false),
    required: clonedField(state, entity, 'required', false, false),
    type: builderVariableType.Object,
    fields: clonedField(state, entity, 'fields', [], false),

    rename: (name: string) => {
      state.mutate(key, {
        name
      })
    },
    setRequired: (value: boolean) => {
      state.mutate(key, {
        required: value
      })
    },

    addField: (variable: Entity) => {
      state.mutate(key, {
        fields: [variable]
      })
    }
  }
}
