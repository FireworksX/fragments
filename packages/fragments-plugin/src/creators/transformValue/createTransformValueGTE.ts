import { builderNodes, builderVariableTransforms, builderVariableType } from 'src'
import { generateId } from '@fragments/utils'

export interface CreateTransformValueGTEOptions {
  value: string | number
}

export const createTransformValueGTE = (options: CreateTransformValueGTEOptions) => ({
  _type: builderNodes.TransformValue,
  _id: generateId(),
  name: builderVariableTransforms.gte,
  value: options?.value ?? null
})
