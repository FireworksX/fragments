import { Entity, LinkKey, Plugin } from '@graph-state/core'
import { builderNodes } from 'src'
import { getKey } from 'src/helpers'
import { override } from 'src/types/props'
import { CreateSolidPaintStyleOptions } from 'src/creators'
import { createSolidPaintStyle, createFrame, createText } from 'src/creators/index.performance'
import { isObject, isPrimitive } from '@fragments/utils'
import { SpringValue } from '@react-spring/web'
import extendPlugin from '@graph-state/plugin-extend'
import { breakpointNode } from '../../nodes/breakpoint/breakpointNode.performance'
import { frameNode } from '../../nodes/frame/frameNode.performance'
import { textNode } from '../../nodes/text/textNode.performance'
import { documentNode } from '../../nodes/document/document.performance'

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

  state.findPrimaryBreakpoint = () =>
    state
      .inspectFields(builderNodes.Breakpoint)
      .map(state.resolve)
      .filter(s => s.isPrimary)[0]

  state.createBreakpoint = (options: { name: string; width: number }) => {
    const primaryBreakpoint = state.findPrimaryBreakpoint()
    if (primaryBreakpoint) {
      const nextScreenLink = primaryBreakpoint.clone()
      const nextBreakpoint = state.mutate(nextScreenLink, {
        ...options,
        isPrimary: false
      })

      state.mutate(state.root, {
        children: [nextBreakpoint]
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

  /**
   * Передаём ссылку на ноду, которую хотим переместить.
   * Мы можем переместить ноду в другую ноду, если toLink - null,
   * то родитель будет Document.
   *
   * Так же можно изменить порядок вложенных нод, передав order.
   */
  state.moveNode = (nodeLink: LinkKey, toLink: LinkKey | null, order?: number) => {
    const node = state.resolve(nodeLink)
    const nodeParent = node?.getParent()
    const toNode = state.resolve(toLink) || state.resolve(state.root)
    const parentKey = state.keyOfEntity(nodeParent)

    if (toLink !== parentKey) {
      nodeParent?.removeChild(node)
      toNode?.insertChild(order || 0, node)
    } else if (typeof order === 'number') {
      nodeParent?.changeOrder(nodeLink, order)
    }
  }

  extendPlugin(
    {
      [builderNodes.Document]: (graph, cache) => documentNode(cache, graph),
      [builderNodes.Breakpoint]: (graph, cache) => breakpointNode(cache, graph),
      [builderNodes.Frame]: (graph, cache) => frameNode(cache, graph),
      [builderNodes.Text]: (graph, cache) => textNode(cache, graph)
      // [builderNodes.Component]: (graph, cache) => componentNode(cache, graph),
      // [builderNodes.ComponentVariant]: (graph, cache) => componentVariantNode(cache, graph),
      // [builderNodes.ComponentInstance]: (graph, cache) => componentInstanceNode(cache, graph)
    },
    {
      excludePartialGraph: true
    }
  )(state)

  return state
}
