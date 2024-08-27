import { Entity, LinkKey, Plugin } from '@graph-state/core'
import { builderNodes, builderVariableTransforms } from 'src'
import { getKey } from 'src/helpers'
import { override } from 'src/types/props'
import { CreateSolidPaintStyleOptions } from 'src/creators'
import { createSolidPaintStyle, createFrame, createText } from 'src/creators/index.performance'
import { isObject, isPrimitive, noop } from '@fragments/utils'
import { SpringValue } from '@react-spring/web'
import extendPlugin from '@graph-state/plugin-extend'
import { breakpointNode } from '../../nodes/breakpoint/breakpointNode.performance'
import { frameNode } from '../../nodes/frame/frameNode.performance'
import { textNode } from '../../nodes/text/textNode.performance'
import { documentNode } from '../../nodes/document/document.performance'
import { createNumberVariable, CreateNumberOptions } from '../../creators/variables/numberVariable'
import { variableNode } from '../../nodes/variable/variable.performance'
import { createBooleanVariable } from '../../creators/variables/booleanVariable'
import { CreateObjectOptions, createObjectVariable } from '../../creators/variables/objectVariable'
import { CreateStringOptions, createStringVariable } from '../../creators/variables/stringVariable'
import { isVariableLink } from '../../utils/isVariableLink'
import { restoreVariableField } from '../../utils/restoreVariableField'
import { createComputedValue, ComputedValueOptions } from '../../creators/createComputedValue'
import { computedValueNode } from '../../nodes/computedValue/computedValue.performance'
import { createTransformValueEquals } from '../../creators/transformValue/createTransformValueEquals'
import { transformValueNode } from '../../nodes/transformValue/transformValueNode.performance'
import { createTransformValueConvertFromBoolean } from '../../creators/transformValue/createTransformValueConvertFromBoolean'
import { createTransformValueNegative } from '../../creators/transformValue/createTransformValueNegative'
import { createTransformValueStartWith } from '../../creators/transformValue/createTransformValueStartWith'
import { createTransformValueEndWith } from '../../creators/transformValue/createTransformValueEndWith'
import { createTransformValueContains } from '../../creators/transformValue/createTransformValueContains'
import { createTransformValueGT } from '../../creators/transformValue/createTransformValueGT'
import { createTransformValueGTE } from '../../creators/transformValue/createTransformValueGTE'
import { createTransformValueLT } from '../../creators/transformValue/createTransformValueLT'
import { createTransformValueLTE } from '../../creators/transformValue/createTransformValueLTE'

export const managerPlugin: Plugin = state => {
  const [rootLink] = state.inspectFields(builderNodes.Document)
  state.root = rootLink
  state.isEmpty = (value: unknown) => typeof value === undefined || value == null
  state.getKey = getKey

  /**
   * Перезаписывается ли в данный момент это поле
   */
  state.isOverrideFromField = (entity: Entity, fieldKey: string) => {
    const resolvedEntity: any = typeof entity === 'string' ? state.resolve(entity) : entity
    const resolvedOverride: any = state.resolve(resolvedEntity?.overrideFrom ?? '')
    const fieldValue = resolvedEntity?.[fieldKey]
    return !!resolvedOverride && !fieldValue
  }

  /**
   * true - если кто-то перезаписывает Entity
   */
  state.hasOverrider = (entity: Entity) => {
    const resolvedEntity: any = typeof entity === 'string' ? state.resolve(entity) : entity
    return !!resolvedEntity?.overrideFrom
  }

  state.resetOverride = (entity: Entity, field: string) => {
    state.mutate(state.keyOfEntity(entity) as any, {
      [field]: null
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

  state.createNumberVariable = (options: CreateNumberOptions) => {
    const entity = createNumberVariable(state, options)
    return state.mutate(entity)
  }

  state.createBooleanVariable = (options: CreateNumberOptions) => {
    const entity = createBooleanVariable(state, options)
    return state.mutate(entity)
  }

  state.createObjectVariable = (options: CreateObjectOptions) => {
    const entity = createObjectVariable(state, options)
    return state.mutate(entity)
  }

  state.createStringVariable = (options: CreateStringOptions) => {
    const entity = createStringVariable(state, options)
    return state.mutate(entity)
  }

  state.createText = () => {
    const entity = createText(state)
    return state.mutate(entity)
  }

  state.createWrapper = (targetLink: LinkKey) => {
    const node = state.resolve(targetLink)
    const parent = node.getParent()

    if (parent) {
      const targetIndex = parent.findChildIndex(child => child._id === node._id)
      const wrapperFrameLink = state.createFrame()
      state.moveNode(targetLink, wrapperFrameLink)

      parent.insertChild(targetIndex, wrapperFrameLink)
    }
  }

  state.createComputedValue = (options: ComputedValueOptions) => {
    const node = createComputedValue(options)
    return state.mutate(node)
  }

  state.createTransformValue = (type: keyof typeof builderVariableTransforms, options) => {
    const creator = {
      [builderVariableTransforms.equals]: createTransformValueEquals,
      [builderVariableTransforms.convertFromBoolean]: createTransformValueConvertFromBoolean,
      [builderVariableTransforms.negative]: createTransformValueNegative,
      [builderVariableTransforms.startWith]: createTransformValueStartWith,
      [builderVariableTransforms.endWith]: createTransformValueEndWith,
      [builderVariableTransforms.contains]: createTransformValueContains,
      [builderVariableTransforms.gt]: createTransformValueGT,
      [builderVariableTransforms.gte]: createTransformValueGTE,
      [builderVariableTransforms.lt]: createTransformValueLT,
      [builderVariableTransforms.lte]: createTransformValueLTE
    }[type]

    if (creator) {
      const transform = creator(options)
      return state.mutate(transform)
    }
  }

  state.removeWrapper = (targetLink: LinkKey) => {
    const node = state.resolve(targetLink)
    const parent = node.getParent()

    if (node._type === builderNodes.Frame && node.children.length > 0) {
      const targetIndex = parent.findChildIndex(child => child._id === node._id)
      const children = node.children

      children.forEach(childLink => {
        state.moveNode(childLink, parent, targetIndex)
      })

      node.remove()
    }
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

  state.toJSONState = () => {
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

  state.restoreField = (targetLink: LinkKey, field: string) => {
    const targetNode = state.resolve(targetLink)
    if (targetNode) {
      const fieldValue = targetNode[field]
      const restoreNode = restoreVariableField([targetNode], fieldValue, field)
      state.mutate(restoreNode)
    }
  }

  extendPlugin(
    {
      [builderNodes.Document]: (graph, cache) => documentNode(cache, graph),
      [builderNodes.Breakpoint]: (graph, cache) => breakpointNode(cache, graph),
      [builderNodes.Frame]: (graph, cache) => frameNode(cache, graph),
      [builderNodes.Text]: (graph, cache) => textNode(cache, graph),
      [builderNodes.Variable]: (graph, cache) => variableNode(cache, graph),
      [builderNodes.ComputedValue]: (graph, cache) => computedValueNode(cache, graph),
      [builderNodes.TransformValue]: (graph, cache) => transformValueNode(cache, graph)
      // [builderNodes.Component]: (graph, cache) => componentNode(cache, graph),
      // [builderNodes.ComponentVariant]: (graph, cache) => componentVariantNode(cache, graph),
      // [builderNodes.ComponentInstance]: (graph, cache) => componentInstanceNode(cache, graph)
    },
    {
      excludePartialGraph: true
    }
  )(state)

  const originalInvalidate = state.invalidate
  const overriderInvalidate = (...args) => {
    /*
    Восстанавливаем исходное значение в местах
    где использовалась Variable
     */
    const link = args[0]
    if (isVariableLink(link)) {
      const restoredParents = restoreVariableField(state.resolveParents(link), link)
      restoredParents.forEach(state.mutate)
    }

    originalInvalidate(...args)
  }

  state.invalidate = overriderInvalidate

  return state
}
