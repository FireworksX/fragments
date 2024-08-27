import { builderVariableType, builderNodes } from 'src'
import { generateId } from '@fragments/utils'
import { GraphState, LinkKey } from '@graph-state/core'

export type CreateObjectOptions = Partial<{
  name: string
  required: boolean
  fields: LinkKey[]
}>

export const createObjectVariable = (state: GraphState, options: CreateObjectOptions) => {
  const id = generateId()

  return {
    _type: builderNodes.Variable,
    _id: id,
    name: options?.name || id,
    required: options?.required || false,
    type: builderVariableType.Object,
    fields: [],
    value: null
  }
}
