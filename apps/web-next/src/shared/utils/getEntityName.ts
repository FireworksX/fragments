import { GraphState } from '@graph-state/core'

export const getEntityName = (baseName: string, graphState: GraphState, entityType: string) => {
  const nextIndex = graphState.inspectFields(entityType)?.length + 1
  return `${baseName} ${nextIndex}`
}
