import { iterateParentOfNode } from '../utils/iterateParentOfNode'
import { Entity, Graph, GraphState } from '@graph-state/core'
import { animatableValue } from '@/builder/utils/animatableValue'

interface Options {
  node: Element
  stopNode?: Element | null
}

export const getRectFromLayer = (layer: Graph) => {
  if (!layer) return { top: 0, height: 0, width: 0, bottom: 0, left: 0, right: 0 }

  const y = animatableValue(layer.resolveField('y'))
  const x = animatableValue(layer.resolveField('x'))

  return { top: y, bottom: 0, left: 0, right: 0, height: 0, width: 0 }
}
