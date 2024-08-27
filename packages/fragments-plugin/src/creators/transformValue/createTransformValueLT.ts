import { builderNodes, builderVariableTransforms, builderVariableType } from 'src'
import { generateId } from '@fragments/utils'

export interface CreateTransformValueLTOptions {
  value: string | number
}

export const createTransformValueLT = (options: CreateTransformValueLTOptions) => ({
  _type: builderNodes.TransformValue,
  _id: generateId(),
  name: builderVariableTransforms.lt,
  value: options?.value ?? null
})
