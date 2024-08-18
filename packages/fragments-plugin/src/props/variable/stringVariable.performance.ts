import { Resolver } from 'src/helpers'
import { clonedField } from 'src/utils/cloneField/cloneField.performance'
import { builderVariableType } from 'src'

export const stringVariable: Resolver = (state, entity: any) => {
  const key = state.keyOfEntity(entity)

  return {
    ...entity,
    name: clonedField(state, entity, 'name', entity._id, false),
    required: clonedField(state, entity, 'required', false, false),
    type: builderVariableType.String,
    defaultValue: clonedField(state, entity, 'defaultValue', '', false),
    placeholder: clonedField(state, entity, 'placeholder', null, false),
    displayTextArea: clonedField(state, entity, 'displayTextArea', false, false),

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
    setDefaultValue: (value: string) => {
      state.mutate(key, {
        defaultValue: value
      })
    },
    setPlaceholder: (value: string) => {
      state.mutate(key, {
        placeholder: value
      })
    },
    setDisplayTextArea: (flag: boolean) => {
      state.mutate(key, {
        displayTextArea: flag
      })
    }
  }
}
