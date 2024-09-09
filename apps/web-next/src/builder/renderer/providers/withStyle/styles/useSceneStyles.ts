import { Graph } from '@graph-state/core'
import { to } from '@react-spring/web'
import { definitions } from '@fragments/plugin-state'

export const useSceneStyles = (graph: Graph) => {
  if (!graph) return {}

  const isFlex = to(graph.resolveField('layerMode'), mode => mode === definitions.layerMode.flex)

  return {
    opacity: graph.resolveField('opacity', 1),
    display: to([graph.resolveField('visible', true), isFlex], (value, isFlex) =>
      value ? (isFlex ? 'flex' : 'block') : 'none'
    )
  }
}
