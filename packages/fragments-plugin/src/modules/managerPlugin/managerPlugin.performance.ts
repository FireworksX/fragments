import { Entity, LinkKey, Plugin } from '@graph-state/core'
import { builderNodes } from 'src'
import { getKey } from 'src/helpers'
import { override } from 'src/types/props'

export const managerPlugin: Plugin = state => {
  const [rootLink] = state.inspectFields(builderNodes.Document)
  state.root = rootLink
  state.isEmpty = (value: unknown) => typeof value === undefined || value == null
  state.getKey = getKey

  state.isOverrideFromField = (entity: Entity, fieldKey: string) => {
    const resolvedEntity: any = typeof entity === 'string' ? state.resolve(entity) : entity
    const resolvedOverride: any = state.resolve(resolvedEntity?.overrideFrom ?? '')
    const fieldValue = entity?.[fieldKey]
    return !!resolvedOverride && !fieldValue
  }

  state.hasOverride = (entity: Entity, field?: string) => {
    const resolvedEntity: any = typeof entity === 'string' ? state.resolve(entity) : entity
    const resolvedOverride: any = state.resolve(resolvedEntity?.overrideFrom ?? '')
    const fieldValue = entity?.[field]
    return !!resolvedOverride && fieldValue
  }

  state.resetOverride = (entity: Entity, field: string) => {
    state.mutate(state.keyOfEntity(entity) as any, {
      [field]: override
    })
  }

  state.resolveValue = (link: LinkKey, field: string) => {
    const graph: any = state.resolve(link)
    const value = graph?.[field]

    if (!state.isEmpty(value) && !state.isOverrideFromField(value)) {
      return value
    } else if (graph?.overrideFrom) {
      return state.resolveValue(graph.overrideFrom, field)
    }

    return undefined
  }

  return state
}
