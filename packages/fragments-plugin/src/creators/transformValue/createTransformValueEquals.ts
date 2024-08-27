import { builderNodes, builderVariableTransforms, builderVariableType } from 'src'
import { generateId } from '@fragments/utils'

export interface CreateTransformValueEqualsOptions {
  value: string | number
}

export const createTransformValueEquals = (options: CreateTransformValueEqualsOptions) => ({
  _type: builderNodes.TransformValue,
  _id: generateId(),
  name: builderVariableTransforms.equals,
  value: options?.value ?? null
})
