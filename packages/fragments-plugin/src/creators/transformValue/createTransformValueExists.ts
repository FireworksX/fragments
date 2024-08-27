import { builderNodes, builderVariableTransforms, builderVariableType } from 'src'
import { generateId } from '@fragments/utils'

export interface CreateTransformValueExistsOptions {
  value: string | number
}

export const createTransformValueExists = (options: CreateTransformValueExistsOptions) => ({
  _type: builderNodes.TransformValue,
  _id: generateId(),
  name: builderVariableTransforms.exists,
  value: options?.value ?? null
})
