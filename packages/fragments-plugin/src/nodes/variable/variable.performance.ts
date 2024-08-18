import { builderNodes, builderVariableType } from 'src/index.performance'
import { pipeResolvers, ResolverNode } from 'src/helpers'
import { numberVariable } from '../../props/variable/numberVariable.performance'
import { booleanVariable } from '../../props/variable/booleanVariable.performance'
import { objectVariable } from '../../props/variable/objectVariable.performance'
import { stringVariable } from '../../props/variable/stringVariable.performance'

export const variableNode: ResolverNode = (state, entity?: unknown): unknown => {
  const variableType = state.safeResolve(entity)?.type

  const resolvers: any[] =
    {
      [builderVariableType.Number]: [numberVariable],
      [builderVariableType.Boolean]: [booleanVariable],
      [builderVariableType.Object]: [objectVariable],
      [builderVariableType.String]: [stringVariable],
      none: []
    }[variableType] || []

  return pipeResolvers(...resolvers)(entity, state)
}
