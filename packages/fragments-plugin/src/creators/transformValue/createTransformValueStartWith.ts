import { builderNodes, builderVariableTransforms, builderVariableType } from 'src'
import { generateId } from '@fragments/utils'

export interface CreateTransformValueStartWithOptions {
  value: string | number
}

export const createTransformValueStartWith = (options: CreateTransformValueStartWithOptions) => ({
  _type: builderNodes.TransformValue,
  _id: generateId(),
  name: builderVariableTransforms.startWith,
  value: options?.value ?? null
})
