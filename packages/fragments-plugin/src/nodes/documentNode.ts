import { DocumentNode, SelectionType, SetSelection } from '../types/nodes'
import { builderNodes } from '../defenitions'
import { generateId, pipeResolvers, ResolverNode } from '../helpers'
import { childrenPropsResolver } from '../propsResolvers/childrenPropsResolver'
import { basePropsResolver } from '../propsResolvers/basePropsResolver'
import { GraphState } from '@graph-state/core'

export const documentNode: ResolverNode = (graphState: GraphState, initialEntity?: DocumentNode): DocumentNode => {
  const node = {
    ...initialEntity,
    _type: builderNodes.Document,
    selection: ['Frame:45b080252568c'],
    _id: initialEntity?._id ?? generateId(),
    setSelection(firstArg: SetSelection, ...rest: any[]): void {
      let nodes: SelectionType[] = []

      if (typeof firstArg === 'function') {
        const currentSelection = graphState.resolve(graphState.root)?.selection ?? []
        nodes = firstArg(currentSelection)
      } else {
        nodes = [firstArg, ...rest]
      }

      // TODO Нужно исключать детей выбранных нод
      graphState.mutate(
        graphState.root,
        {
          selection: nodes
            .map(node => (typeof node === 'string' ? node : graphState.keyOfEntity(node)))
            .filter(Boolean) as string[]
        },
        { replace: true }
      )
    }
  }

  return pipeResolvers(basePropsResolver, childrenPropsResolver)(node, graphState)
}
