import { Entity, GraphState, isLinkKey } from '@graph-state/core'
import { SpringValue } from '@react-spring/web'
import { isPrimitive, isValue } from '@fragments/utils'

export const clonedField = (graphState: GraphState, entity: Entity, key: string, fallback?: unknown = null) => {
  if (graphState.isOverrideFromField(entity, key)) {
    return null
  }

  const value = entity[key]

  if (isValue(value)) {
    if (isPrimitive(value) && !isLinkKey(value)) {
      return new SpringValue(value)
    }
    return value
  }

  if (isValue(fallback)) {
    if (isPrimitive(fallback)) {
      return new SpringValue(fallback)
    }
    return fallback
  }

  return null
}
