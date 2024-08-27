import { builderNodes, builderVariableTransforms, builderVariableType } from 'src'
import { generateId } from '@fragments/utils'

export interface CreateTransformValueLTEOptions {
  value: string | number
}

export const createTransformValueLTE = (options: CreateTransformValueLTEOptions) => ({
  _type: builderNodes.TransformValue,
  _id: generateId(),
  name: builderVariableTransforms.lt,
  value: options?.value ?? null
})
