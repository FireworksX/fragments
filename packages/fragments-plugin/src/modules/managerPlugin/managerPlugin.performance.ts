import { Entity, LinkKey, Plugin } from '@graph-state/core'
import { builderNodes } from 'src'
import { getKey } from 'src/helpers'
import { override } from 'src/types/props'
import { CreateSolidPaintStyleOptions } from 'src/creators'
import { createSolidPaintStyle, createFrame, createText } from 'src/creators/index.performance'
import { isObject, isPrimitive } from '@fragments/utils'
import { SpringValue } from '@react-spring/web'

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

  /**
   * Creators
   */

  state.findPrimaryScreen = () =>
    state
      .inspectFields(builderNodes.Screen)
      .map(state.resolve)
      .filter(s => s.isPrimary)[0]

  state.createScreen = (options: { name: string; width: number }) => {
    const primaryScreen = state.findPrimaryScreen()
    if (primaryScreen) {
      const nextScreenLink = primaryScreen.clone()
      state.mutate(nextScreenLink, {
        ...options,
        isPrimary: false
      })
    }
  }

  state.createSolidPaintStyle = (options: CreateSolidPaintStyleOptions) => {
    if (options) {
      const entity = createSolidPaintStyle(state, options)
      return state.mutate(entity)
    }

    return null
  }

  state.createFrame = () => {
    const entity = createFrame(state)
    return state.mutate(entity)
  }

  state.createText = () => {
    const entity = createText(state)
    return state.mutate(entity)
  }

  const nodeToJSON = (node: unknown) => {
    const resultNode = Object.entries(node).reduce((acc, [key, value]) => {
      if (isPrimitive(value) && value) {
        return { ...acc, [key]: value }
      }

      if (Array.isArray(value) && value.length) {
        return { ...acc, [key]: value.map(nodeToJSON) }
      }

      if (isObject(value)) {
        return { ...acc, [key]: value instanceof SpringValue ? value.toJSON() : nodeToJSON(value) }
      }

      return acc
    }, {})

    return resultNode
  }

  state.toJSON = () => {
    const document = state.resolve(state.root, { deep: true })
    if (!document) {
      return
    }

    return nodeToJSON(document)
  }

  return state
}
