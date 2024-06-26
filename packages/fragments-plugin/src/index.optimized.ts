// import { Entity, LinkKey, Plugin } from '@graph-state/core'
// import loggerPlugin from '@graph-state/plugin-logger'
// import extendPlugin from '@graph-state/plugin-extend'
// import { builderNodes } from 'src/defenitions'
// import { documentNode } from './nodes/documentNode'
// import { viewportNode } from './nodes/viewportNode'
// import { screenNode } from './nodes/screenNode'
// import { override } from './types/props'
// import { frameNode } from './nodes/frameNode'
// import { getKey, OVERRIDE } from './helpers'
// import { textNode } from './nodes/textNode'
// import { componentNode } from './nodes/componentNode'
// import { componentVariantNode } from './nodes/componentVariantNode'
// import { componentInstanceNode } from './nodes/componentInstanceNode'
// import { creators } from './staticMethods/creators'
// import { isValue } from '@fragments/utils'
//
// export const fragmentsPlugin: Plugin = (graphState: any) => {
//   extendPlugin(
//     {
//       [builderNodes.Document]: (graph, cache) => documentNode(cache, graph),
//       [builderNodes.Screen]: (graph, cache) => screenNode(cache, graph),
//       [builderNodes.Frame]: (graph, cache) => frameNode(cache, graph),
//       [builderNodes.Text]: (graph, cache) => textNode(cache, graph),
//       [builderNodes.Component]: (graph, cache) => componentNode(cache, graph),
//       [builderNodes.ComponentVariant]: (graph, cache) => componentVariantNode(cache, graph),
//       [builderNodes.ComponentInstance]: (graph, cache) => componentInstanceNode(cache, graph)
//     },
//     {
//       excludePartialGraph: true
//     }
//   )(graphState)
//
//   return creators(graphState)
// }
//
// export default fragmentsPlugin
// export * from './defenitions'
// export { getDefaultBorder, getDefaultImageFill, getDefaultSolidFill } from './propsResolvers/geometryPropsResolver'
