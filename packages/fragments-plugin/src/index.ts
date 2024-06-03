import { Entity, LinkKey, Plugin } from '@graph-state/core'
import loggerPlugin from '@graph-state/plugin-logger'
import extendPlugin from '@graph-state/plugin-extend'
import { builderNodes } from 'src/defenitions'
import { documentNode } from './nodes/documentNode'
import { viewportNode } from './nodes/viewportNode'
import { screenNode } from './nodes/screenNode'
import { override } from './types/props'
import { frameNode } from './nodes/frameNode'
import { OVERRIDE } from './helpers'
import { textNode } from './nodes/textNode'
import { componentNode } from './nodes/componentNode'
import { componentVariantNode } from './nodes/componentVariantNode'
import { componentInstanceNode } from './nodes/componentInstanceNode'
import { creators } from './staticMethods/creators'
import { isValue } from '@fragments/utils'

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

export const fragmentsPlugin: Plugin = (graphState: any) => {
  const hasLoggerPlugin = 'debugLog' in graphState

  if (!hasLoggerPlugin) {
    loggerPlugin({ onlyBrowser: true })(graphState)
  }

  // const org = graphState.mutate
  // graphState.mutate = (...args) => {
  //   console.log(...args)
  //   return org(...args)
  // }

  // graphState.subscribe(state => {
  //   console.log(state)
  // })

  const [rootLink] = graphState.inspectFields(builderNodes.Document)
  graphState.root = rootLink
  // graphState.empty = empty
  graphState.viewport = graphState.keyOfEntity(viewportNode(graphState) as any)
  graphState.isEmpty = (value: unknown) => typeof value === undefined || value == null

  /**
   * If field has override from overrideFrom value.
   */
  graphState.isOverrideFromField = (entity: Entity, fieldKey: string) => {
    const resolvedEntity: any = typeof entity === 'string' ? graphState.resolve(entity) : entity
    const resolvedOverride: any = graphState.resolve(resolvedEntity?.overrideFrom ?? '')
    const fieldValue = entity?.[fieldKey]
    return !!resolvedOverride && !fieldValue
  }

  graphState.hasOverride = (entity: Entity, field?: string) => {
    const resolvedEntity: any = typeof entity === 'string' ? graphState.resolve(entity) : entity
    const resolvedOverride: any = graphState.resolve(resolvedEntity?.overrideFrom ?? '')
    const fieldValue = entity?.[field]

    // console.log(
    //   entity,
    //   field,
    //   resolvedEntity?.overrideFrom,
    //   resolvedOverride,
    //   fieldValue,
    //   !!resolvedOverride && fieldValue
    // )
    return !!resolvedOverride && fieldValue

    // if (isValue(fieldValue)) return false

    // console.log(resolvedEntity, resolvedEntity?.overrideFrom, resolvedOverride)
    // if (resolvedOverride) {
    // }
    // // const isOverride = field
    // //   ? resolvedEntity[field] === graphState.override || resolvedEntity[field] === undefined
    // //   : true
    // //
    // // const res = isOverride && resolvedOverride?._type === resolvedEntity?._type
    // //
    // // console.log(resolvedEntity, entity, field, res)
    // //
    // // return res
    //
    // return false
  }

  graphState.resetOverride = (entity: Entity, field: string) => {
    graphState.mutate(graphState.keyOfEntity(entity) as any, {
      [field]: override
    })
  }

  graphState.resolveValue = (link: LinkKey, field: string) => {
    const graph: any = graphState.resolve(link)
    const value = graph?.[field]

    if (!graphState.isEmpty(value) && !graphState.isOverrideFromField(value)) {
      return value
    } else if (graph.overrideFrom) {
      return graphState.resolveValue(graph.overrideFrom, field)
    }

    return undefined
  }

  // graphState.mutate(rootNode, {})

  extendPlugin(
    {
      [builderNodes.Document]: (graph, cache) => documentNode(cache, graph),
      [builderNodes.Screen]: (graph, cache) => screenNode(cache, graph),
      [builderNodes.Frame]: (graph, cache) => frameNode(cache, graph),
      [builderNodes.Text]: (graph, cache) => textNode(cache, graph),
      [builderNodes.Component]: (graph, cache) => componentNode(cache, graph),
      [builderNodes.ComponentVariant]: (graph, cache) => componentVariantNode(cache, graph),
      [builderNodes.ComponentInstance]: (graph, cache) => componentInstanceNode(cache, graph)
    },
    {
      excludePartialGraph: true
    }
  )(graphState)

  return creators(graphState)
}

export default fragmentsPlugin
export * from './defenitions'
export { getDefaultBorder, getDefaultImageFill, getDefaultSolidFill } from './propsResolvers/geometryPropsResolver'
