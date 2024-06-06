import { DocumentNode, SelectionType, SetSelection } from '../types/nodes'
import { builderNodes } from '../defenitions'
import { pipeResolvers, ResolverNode } from '../helpers'
import { childrenPropsResolver } from '../propsResolvers/childrenPropsResolver'
import { basePropsResolver } from '../propsResolvers/basePropsResolver'
import { generateId } from '@fragments/utils'

export const documentNode: ResolverNode = (state, initialEntity?: DocumentNode): DocumentNode => {
  const node = {
    ...initialEntity,
    _type: builderNodes.Document,
    _id: initialEntity?._id ?? generateId()
  }

  return pipeResolvers(basePropsResolver, childrenPropsResolver)(node, state)
}
