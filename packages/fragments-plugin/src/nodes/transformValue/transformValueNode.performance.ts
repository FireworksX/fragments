import { builderNodes, builderVariableTransforms, builderVariableType } from 'src/index.performance'
import { pipeResolvers, ResolverNode } from 'src/helpers'
import { transformValueEquals } from '../../props/transformValue/transformValueEquals/transformValueEquals.performance'
import { convertFromBooleanTransformValue } from '../../props/transformValue/transformValueConvertFromBoolean/transformValueConvertFromBoolean'
import { transformValueNegative } from '../../props/transformValue/transformValueNegative/transformValueNegative.performance'
import { transformValueStartWith } from '../../props/transformValue/transformValueStartWith/transformValueStartWith.performance'
import { transformValueEndWith } from '../../props/transformValue/transformValueEndWith/transformValueEndWith.performance'
import { transformValueContains } from '../../props/transformValue/transformValueContains/transformValueContains.performance'
import { transformValueExists } from '../../props/transformValue/transformValueExists/transformValueExists.performance'
import { transformValueValueSize } from '../../props/transformValue/transformValueSize/transformValueSize.performance'

export const transformValueNode: ResolverNode = (state, entity?: unknown): unknown => {
  const variableType = state.safeResolve(entity)?.name

  const resolvers: any[] =
    {
      [builderVariableTransforms.equals]: [transformValueEquals],
      [builderVariableTransforms.convertFromBoolean]: [convertFromBooleanTransformValue],
      [builderVariableTransforms.negative]: [transformValueNegative],
      [builderVariableTransforms.startWith]: [transformValueStartWith],
      [builderVariableTransforms.endWith]: [transformValueEndWith],
      [builderVariableTransforms.contains]: [transformValueContains],
      [builderVariableTransforms.exists]: [transformValueExists],
      [builderVariableTransforms.gt]: [transformValueValueSize('gt')],
      [builderVariableTransforms.gte]: [transformValueValueSize('gte')],
      [builderVariableTransforms.lt]: [transformValueValueSize('lt')],
      [builderVariableTransforms.lte]: [transformValueValueSize('lte')]
    }[variableType] || []

  return pipeResolvers(...resolvers)(entity, state)
}
