import { builderVariableType, builderNodes } from 'src'
import { generateId } from '@fragments/utils'
import { GraphState } from '@graph-state/core'

export type CreateStringOptions = Partial<{
  required: boolean
  name: string
  defaultValue: string
  placeholder: string
  displayTextArea: boolean
}>

export const createStringVariable = (state: GraphState, options: CreateStringOptions) => {
  const id = generateId()

  return {
    _type: builderNodes.Variable,
    _id: id,
    name: options?.name || id,
    required: options?.required || false,
    type: builderVariableType.String,
    defaultValue: options?.defaultValue ?? '',
    placeholder: options?.placeholder ?? null,
    displayTextArea: options?.displayTextArea ?? false,
    value: null
  }
}
