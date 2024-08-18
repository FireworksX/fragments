import { Entity, GraphState, isGraph, isGraphOrKey, isLinkKey } from '@graph-state/core'
import { SpringValue } from '@react-spring/web'
import { isObject, isPrimitive, isValue } from '@fragments/utils'

const isLink = input => typeof input === 'string' && (input.startsWith('http') || input.startsWith('/'))

export const clonedField = (
  graphState: GraphState,
  entity: Entity,
  key: string,
  fallback?: unknown = null,
  isSpring = true
) => {
  if (graphState.isOverrideFromField(entity, key)) {
    return null
  }

  const value = entity[key]

  if (isValue(value)) {
    if ((isPrimitive(value) && !isLinkKey(value)) || isLink(value)) {
      return isSpring ? new SpringValue(value) : value
    }

    if (!isPrimitive(value)) {
      if (isObject(value) && isGraph(value)) {
        return Object.keys(value).reduce((acc, key) => {
          acc[key] = clonedField(graphState, value, key, null, isSpring)

          return acc
        }, {})
      }

      // if (Array.isArray(value)) {
      //   const res = value.map(v => clonedField(graphState, v, key, fallback, isSpring))
      //   console.log(res, value, key)
      //   return res
      // }
    }

    return value
  }

  if (isValue(fallback)) {
    if (isPrimitive(fallback)) {
      return isSpring ? new SpringValue(fallback) : fallback
    }
    return fallback
  }

  return null
}
