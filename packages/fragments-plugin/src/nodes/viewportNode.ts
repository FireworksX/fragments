import { ViewportNode } from '../types/nodes'
import { builderNodes } from '../defenitions'
import { Rect, Vector } from '../types/props'
import { GraphState } from '@graph-state/core'
import { generateId } from '@fragments/utils'

export const viewportNode = (graphState: GraphState): ViewportNode => {
  const _type = builderNodes.Viewport
  const _id = generateId()
  const key = graphState.keyOfEntity({ _type, _id }) ?? ''

  const viewportData: ViewportNode = {
    center: { x: 0, y: 0 },
    zoom: 1,
    bounds: { x: 0, y: 0, width: 0, height: 0 },
    _type: builderNodes.Viewport,
    _id,
    setZoom(zoom: number) {
      graphState.mutate(key, {
        zoom
      })
    },
    setCenter(vector: Vector) {
      graphState.mutate(key, {
        center: vector
      })
    },
    setBound(rect: Rect) {
      graphState.mutate(key, {
        bounds: rect
      })
    }
  }

  return graphState.resolve(graphState.mutate(viewportData)) as ViewportNode
}
