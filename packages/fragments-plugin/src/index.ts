import { LinkKey, Plugin } from '@graph-state/core'
import loggerPlugin from '@graph-state/plugin-logger'
import extendPlugin from '@graph-state/plugin-extend'
import { Entity, keyOfEntity, Statex } from '@adstore/statex'
import { builderNodes } from 'src/defenitions'
import { documentNode } from './nodes/documentNode'
import { viewportNode } from './nodes/viewportNode'
import { screenNode } from './nodes/screenNode'
import { empty, EntityKey, mixed, override } from './types/props'
import { frameNode } from './nodes/frameNode'
import { getKey, OVERRIDE } from './helpers'
import { textNode } from './nodes/textNode'
import { createComponent as createComponentNode, CreateComponentOptions } from 'src/creators/createComponent'
import { createScreen as createScreenNode, CreateScreenOptions } from 'src/creators/createScreen'
import {
  createSolidPaintStyle as createSolidPaintStyleNode,
  CreateSolidPaintStyleOptions
} from 'src/creators/createSolidPaintStyle'
import { createCssLink as createCssLinkNode } from '@adstore/web/src/statexModules/creators/createCssLink'
import { createFrame as createFrameNode } from 'src/creators/createFrame'
import { createText as createTextNode } from 'src/creators/createText'
import { componentNode } from './nodes/componentNode'
import { componentVariantNode } from './nodes/componentVariantNode'
import { componentInstanceNode } from './nodes/componentInstanceNode'
import { createBooleanProperty, createNumberProperty } from './creators/createComponentProperty'
import { creators } from './staticMethods/creators'

// export const statexBuilderPlugin = (statex: Statex) => {
//   const originalMutate = statex.mutate
//   const [rootNode] = statex.inspectFields(builderNodes.Document)
//
//   const mutate = (...args: Parameters<Statex['mutate']>) => {
//     const { entityKey, options, data } = statex.getArgumentsForMutate(...args)
//     const nextOptions = {
//       ...(options ?? {}),
//       overrideMutateMethod: options?.overrideMutateMethod ?? mutate
//     }
//
//     /**
//      * Если передаём Entity внутри которого есть другие Entity
//      * нужно чтобы они тоже оборачивались, для этого передаём overrideMutateMethod
//      */
//     const mutatedKey = originalMutate(
//       entityKey,
//       prev => overrideData(typeof data === 'function' ? data(prev) : data),
//       nextOptions
//     )
//
//     /**
//      * После того как обновляем Entity нужно оповестить об изменениях
//      * overrides лист
//      */
//     if (!options?.skipNotifyOverrides) {
//       const node = statex.resolve(entityKey)
//       node?.overrides?.map(getKey).forEach(mutate)
//     }
//
//     return mutatedKey
//   }
//
//   const overrideData = (entity: Entity) => {
//     const map = {
//       [builderNodes.Document]: documentNode,
//       [builderNodes.Screen]: screenNode,
//       [builderNodes.Frame]: frameNode,
//       [builderNodes.Text]: textNode,
//       [builderNodes.Component]: componentNode,
//       [builderNodes.ComponentVariant]: componentVariantNode,
//       [builderNodes.ComponentInstance]: componentInstanceNode
//     }
//
//     return entity._type in map ? map[entity._type](statex, entity) : entity
//   }
//
//   const createFrame = () => {
//     const entity = createFrameNode(statex)
//     statex.mutate(statex.root, {
//       children: [entity]
//     })
//
//     return keyOfEntity(entity)
//   }
//
//   const createComponent = (options: CreateComponentOptions) => {
//     const componentNode = createComponentNode(statex, options)
//
//     statex.mutate(statex.root, {
//       children: [componentNode]
//     })
//     statex.resolve(componentNode).addVariant()
//
//     return componentNode
//   }
//
//   const createText = () => {
//     const entity = createTextNode(statex)
//     return statex.mutate(statex.root, {
//       children: [entity]
//     })
//   }
//
//   const createScreen = (createScreenOptions: CreateScreenOptions) => {
//     const entity = createScreenNode(statex, createScreenOptions)
//     return statex.mutate(statex.root, {
//       children: [entity]
//     })
//   }
//
//   const createSolidPaintStyle = (options: CreateSolidPaintStyleOptions) => {
//     if (options) {
//       const entity = createSolidPaintStyleNode(statex, options)
//       return statex.mutate(entity)
//     }
//
//     return null
//   }
//
//   const createCssLink = (options: CreateSolidPaintStyleOptions) => {
//     if (options) {
//       const entity = createCssLinkNode(statex, options)
//       return statex.mutate(entity)
//     }
//
//     return null
//   }
//
//   statex.createFrame = createFrame
//   statex.createComponent = createComponent
//   statex.createText = createText
//   statex.createScreen = createScreen
//   statex.createSolidPaintStyle = createSolidPaintStyle
//   statex.createCssLink = createCssLink
//
//   statex.mutate = mutate
//   statex.root = rootNode
//   statex.mixed = mixed
//   statex.empty = empty
//   statex.override = override
//   statex.getKey = getKey
//   statex.viewport = viewportNode(statex)
//   statex.version = '1.0.0'
//   statex.hasOverride = (entity: Entity, field?: string) => {
//     const resolvedEntity = typeof entity === 'string' ? statex.resolve(entity) : entity
//     const resolvedOverride = statex.resolve(resolvedEntity?.overrideFrom)
//     const isOverride = field ? resolvedEntity[field] === statex.override || resolvedEntity[field] === undefined : true
//
//     return isOverride && resolvedOverride?._type === resolvedEntity?._type
//   }
//   statex.resetOverride = (entity: Entity, field: string) => {
//     statex.mutate(keyOfEntity(entity), {
//       [field]: override
//     })
//   }
//
//   statex.resolveValue = (key: EntityKey, field: string) => {
//     const entity = statex.resolve(key)
//
//     if (entity && field in entity && entity[field] !== undefined) {
//       if (entity[field] !== empty && entity[field] !== override) {
//         return entity[field]
//       } else if (entity.overrideFrom) {
//         return statex.resolveValue(entity.overrideFrom, field)
//       }
//     }
//
//     return empty
//   }
//
//   statex.createComponentPropertyMap = {
//     createNumberProperty,
//     createBooleanProperty
//   }
//
//   mutate(statex.deepResolve(rootNode), {
//     replace: true,
//     skipNotifyOverrides: true
//   })
// }

export const fragmentsPlugin: Plugin = graphState => {
  const hasLoggerPlugin = 'debugLog' in graphState
  const hasExtenderPlugin = 'declareExtendGraph' in graphState

  if (!hasLoggerPlugin) {
    loggerPlugin({ onlyBrowser: true })(graphState)
  }
  if (!hasExtenderPlugin) {
    extendPlugin()(graphState)
  }

  const [rootLink] = graphState.inspectFields(builderNodes.Document)
  graphState.root = rootLink
  // graphState.empty = empty
  graphState.viewport = graphState.keyOfEntity(viewportNode(graphState))
  graphState.isEmpty = (value: unknown) => typeof value === undefined || value == null

  graphState.hasOverride = (entity: Entity, field?: string) => {
    const resolvedEntity = typeof entity === 'string' ? graphState.resolve(entity) : entity
    const resolvedOverride = graphState.resolve(resolvedEntity?.overrideFrom)
    const isOverride = field
      ? resolvedEntity[field] === graphState.override || resolvedEntity[field] === undefined
      : true

    return isOverride && resolvedOverride?._type === resolvedEntity?._type
  }

  graphState.resetOverride = (entity: Entity, field: string) => {
    graphState.mutate(keyOfEntity(entity), {
      [field]: override
    })
  }

  graphState.resolveValue = (link: LinkKey, field: string) => {
    if (field == 'visible') {
      // console.trace(link, field)
    }
    const graph = graphState.resolve(link)

    if (graph && field in graph && graph[field] !== undefined) {
      if (!graphState.isEmpty(graph[field]) && graph[field] !== OVERRIDE) {
        return graph[field]
      } else if (graph.overrideFrom) {
        return graphState.resolveValue(graph.overrideFrom, field)
      }
    }

    return undefined
  }

  // graphState.mutate(rootNode, {})

  graphState.declareExtendGraph(builderNodes.Document, (graph, cache) => documentNode(cache, graph))
  graphState.declareExtendGraph(builderNodes.Screen, (graph, cache) => screenNode(cache, graph))
  graphState.declareExtendGraph(builderNodes.Frame, (graph, cache) => frameNode(cache, graph))
  graphState.declareExtendGraph(builderNodes.Text, (graph, cache) => textNode(cache, graph))
  graphState.declareExtendGraph(builderNodes.Component, (graph, cache) => componentNode(cache, graph))
  graphState.declareExtendGraph(builderNodes.ComponentVariant, (graph, cache) => componentVariantNode(cache, graph))
  graphState.declareExtendGraph(builderNodes.ComponentInstance, (graph, cache) => componentInstanceNode(cache, graph))

  return creators(graphState)
}

export default fragmentsPlugin
export * from './defenitions'
export { getDefaultBorder, getDefaultImageFill, getDefaultSolidFill } from './propsResolvers/geometryPropsResolver'
