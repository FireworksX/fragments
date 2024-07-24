import { Entity, GraphState } from '@graph-state/core'
import { SpringValue } from '@react-spring/web'
import { isPrimitive } from '@fragments/utils'

export const clonedField = (graphState: GraphState, entity: Entity, key: string, fallback?: unknown = null) =>
  graphState.isOverrideFromField(entity, key)
    ? null
    : entity[key]
    ? new SpringValue(entity[key])
    : isPrimitive(fallback) && fallback
    ? new SpringValue(fallback)
    : fallback
