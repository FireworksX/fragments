import { builderVariableType, builderNodes } from 'src'
import { generateId } from '@fragments/utils'
import { GraphState } from '@graph-state/core'

export type CreateBooleanOptions = Partial<{
  required: boolean
  name: string
  defaultValue: boolean
}>

export const createBooleanVariable = (state: GraphState, options: CreateBooleanOptions) => {
  const id = generateId()

  return {
    _type: builderNodes.Variable,
    _id: id,
    name: options?.name || id,
    required: options?.required || false,
    type: builderVariableType.Boolean,
    defaultValue: false
  }
}
