import { builderNodes, builderVariableTransforms, builderVariableType } from 'src'
import { generateId } from '@fragments/utils'

export interface CreateTransformValueConvertFromBooleanOptions {
  outputType: keyof typeof builderVariableType
  truthy: unknown
  falsy: unknown
}

export const createTransformValueConvertFromBoolean = (options: CreateTransformValueConvertFromBooleanOptions) => ({
  _type: builderNodes.TransformValue,
  _id: generateId(),
  name: builderVariableTransforms.convertFromBoolean,
  outputType: options?.outputType ?? null,
  truthy: options?.truthy ?? null,
  falsy: options?.falsy ?? null
})
