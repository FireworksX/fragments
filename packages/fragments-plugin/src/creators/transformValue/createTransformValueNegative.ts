import { builderNodes, builderVariableTransforms, builderVariableType } from 'src'
import { generateId } from '@fragments/utils'

export const createTransformValueNegative = () => ({
  _type: builderNodes.TransformValue,
  _id: generateId(),
  name: builderVariableTransforms.negative
})
