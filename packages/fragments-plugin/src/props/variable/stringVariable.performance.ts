import { Resolver } from 'src/helpers'
import { clonedField } from 'src/utils/cloneField/cloneField.performance'
import { builderVariableType } from 'src'
import { to } from '@react-spring/web'
import { isValue } from '@fragments/utils'
import { springValueSetter } from '../../utils/valueSetter/springValueSetter.performance'

export const stringVariable: Resolver = (state, entity: any) => {
  const key = state.keyOfEntity(entity)
  const defaultValueSetter = springValueSetter(state, key, 'defaultValue')

  return {
    ...entity,
    name: clonedField(state, entity, 'name', entity._id, false),
    value: clonedField(state, entity, 'value'),
    required: clonedField(state, entity, 'required', false, false),
    type: builderVariableType.String,
    defaultValue: clonedField(state, entity, 'defaultValue', ''),
    placeholder: clonedField(state, entity, 'placeholder', null),
    displayTextArea: clonedField(state, entity, 'displayTextArea', false, false),

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
    setDefaultValue: defaultValueSetter,
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
