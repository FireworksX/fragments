import { builderNodes, builderVariableTransforms, builderVariableType } from 'src'
import { generateId } from '@fragments/utils'

export interface CreateTransformValueContainsOptions {
  value: string | number
}

export const createTransformValueContains = (options: CreateTransformValueContainsOptions) => ({
  _type: builderNodes.TransformValue,
  _id: generateId(),
  name: builderVariableTransforms.contains,
  value: options?.value ?? null
})
