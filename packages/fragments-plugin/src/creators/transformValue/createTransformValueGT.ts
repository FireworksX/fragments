import { builderNodes, builderVariableTransforms, builderVariableType } from 'src'
import { generateId } from '@fragments/utils'

export interface CreateTransformValueGTOptions {
  value: string | number
}

export const createTransformValueGT = (options: CreateTransformValueGTOptions) => ({
  _type: builderNodes.TransformValue,
  _id: generateId(),
  name: builderVariableTransforms.gt,
  value: options?.value ?? null
})
