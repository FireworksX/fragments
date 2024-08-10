import { builderNodes } from 'src/index.performance'
import { pipeResolvers, ResolverNode } from 'src/helpers'
import { childrenProps } from 'src/props/children/children.performance'
import { baseProps } from 'src/props/base/base.performance'
import { generateId } from '@fragments/utils'
import { DocumentNode } from '../../types/nodes'

export const documentNode: ResolverNode = (state, initialEntity?: DocumentNode): DocumentNode => {
  const node = {
    ...initialEntity,
    _type: builderNodes.Document,
    _id: initialEntity?._id ?? generateId()
  }

  return pipeResolvers(baseProps, childrenProps)(node, state)
}
