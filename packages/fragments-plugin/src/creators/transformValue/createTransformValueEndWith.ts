import { builderNodes, builderVariableTransforms, builderVariableType } from 'src'
import { generateId } from '@fragments/utils'

export interface CreateTransformValueEndWithOptions {
  value: string | number
}

export const createTransformValueEndWith = (options: CreateTransformValueEndWithOptions) => ({
  _type: builderNodes.TransformValue,
  _id: generateId(),
  name: builderVariableTransforms.endWith,
  value: options?.value ?? null
})
