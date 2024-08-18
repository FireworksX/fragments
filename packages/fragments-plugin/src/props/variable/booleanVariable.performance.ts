import { Resolver } from 'src/helpers'
import { clonedField } from 'src/utils/cloneField/cloneField.performance'
import { builderVariableType } from 'src'

export const booleanVariable: Resolver = (state, entity: any) => {
  const key = state.keyOfEntity(entity)

  return {
    ...entity,
    name: clonedField(state, entity, 'name', entity._id, false),
    required: clonedField(state, entity, 'required', false, false),
    type: builderVariableType.Boolean,
    defaultValue: clonedField(state, entity, 'defaultValue', false, false),

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
    setDefaultValue: (value: number) => {
      state.mutate(key, {
        defaultValue: value
      })
    }
  }
}
