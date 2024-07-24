import { Plugin } from '@graph-state/core'
import extendPlugin from '@graph-state/plugin-extend'
import { builderNodes } from 'src'
import { frameNode } from 'src/nodes/frame/frameNode.performance'
import { screenNode } from 'src/nodes/screen/screenNode.performance'
import { textNode } from 'src/nodes/text/textNode.performance'

export const documentPlugin: Plugin = state => {
  extendPlugin(
    {
      // [builderNodes.Document]: (graph, cache) => documentNode(cache, graph),
      [builderNodes.Screen]: (graph, cache) => screenNode(cache, graph),
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
