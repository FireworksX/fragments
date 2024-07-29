import { Entity, GraphState } from '@graph-state/core'
import { SpringValue } from '@react-spring/web'
import { isPrimitive, isValue } from '@fragments/utils'

export const clonedField = (graphState: GraphState, entity: Entity, key: string, fallback?: unknown = null) => {
  if (graphState.isOverrideFromField(entity, key)) {
    return null
  }

  if (isValue(entity[key])) {
    if (isPrimitive(entity[key])) {
      return new SpringValue(entity[key])
    }
    return entity[key]
  }

  if (isValue(fallback)) {
    if (isPrimitive(fallback)) {
      return new SpringValue(fallback)
    }
    return fallback
  }

  return null
}
