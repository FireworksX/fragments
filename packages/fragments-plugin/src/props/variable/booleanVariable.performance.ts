import { Resolver } from 'src/helpers'
import { clonedField } from 'src/utils/cloneField/cloneField.performance'
import { builderVariableType } from 'src'
import { to } from '@react-spring/web'
import { isValue } from '@fragments/utils'

export const booleanVariable: Resolver = (state, entity: any) => {
  const key = state.keyOfEntity(entity)

  return {
    ...entity,
    value: clonedField(state, entity, 'value', null),
    name: clonedField(state, entity, 'name', entity._id, false),
    required: clonedField(state, entity, 'required', false, false),
    type: builderVariableType.Boolean,
    defaultValue: clonedField(state, entity, 'defaultValue', false, false),

    getValue: () => {
      const graph = state.resolve(key)
      const value$ = graph.value
      const defaultValue$ = graph.defaultValue

      return to([value$, defaultValue$], (value, defaulValue) => (isValue(value) ? value : defaulValue))
    },

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
