import { useContext } from 'react'
import { BuilderContext } from '@/builder/BuilderContext'
import { DragEvent } from '@/builder/views/BuilderEditable/widgets/BuilderCanvas/hooks/useCanvas'
import { definitions } from '@fragments/plugin-state'
import { isPartialKey } from '@graph-state/core'
import { animatableValue } from '@/builder/utils/animatableValue'

export const useDragCollisions = () => {
  const { documentManager, canvasManager } = useContext(BuilderContext)

  const calculateMemoData = (memo, parentLayerKey) => {
    const parentLayerNode = documentManager.resolve(parentLayerKey)
    const parentLayerRect = animatableValue(parentLayerNode?.absoluteRect?.())

    const currentBreakpoint = documentManager
      .resolve(memo.targetLayerLink)
      ?.getAllParents()
      ?.find(p => p._type === definitions.nodes.Breakpoint)
    const currentBreakpointKey = documentManager.keyOfEntity(currentBreakpoint)

    const allParentsOfParent = (documentManager.resolve(parentLayerKey).getAllParents() ?? []).map(
      documentManager.keyOfEntity
    )

    const allCanvasLayersForParent =
      currentBreakpoint?.findAll(
        child =>
          child._type === definitions.nodes.Frame &&
          !isPartialKey(documentManager.keyOfEntity(child)) &&
          child._id !== parentLayerNode?._id &&
          child._id !== memo.targetLayer?._id &&
          !allParentsOfParent.includes(documentManager.keyOfEntity(child))
      ) ?? []

    const alternativeParents = allCanvasLayersForParent.map(layer => ({
      layerKey: documentManager.keyOfEntity(layer),
      rect: animatableValue(documentManager.resolve(layer)?.absoluteRect?.())
    }))

    return {
      offsetLeft: 0,
      offsetTop: 0,
      parentLayerKey,
      parentLayerNode,
      parentLayerRect,
      alternativeParents,
      currentBreakpoint,
      currentBreakpointKey,
      onTopLevel: parentLayerKey === currentBreakpointKey
    }
  }

  return ({ memo, first }: DragEvent, inputPoint) => {
    if (first) {
      const parentLayerNode = documentManager.resolve(memo.targetLayerLink)?.getParent()
      const parentLayerKey = documentManager.keyOfEntity(parentLayerNode)

      memo.collisions = calculateMemoData(memo, parentLayerKey)
    }

    if (!memo?.collisions) return inputPoint

    const targetLayerRect = animatableValue(memo?.targetLayer?.absoluteRect?.())

    const isInsideOfParent =
      targetLayerRect && memo?.collisions?.parentLayerRect
        ? documentManager.rect.intersects(memo?.collisions?.parentLayerRect, targetLayerRect)
        : false
    const onNextParent = memo?.collisions?.alternativeParents?.findLast(layer => {
      return documentManager.rect.containsRect(layer.rect, targetLayerRect)
    })

    const moveNode = nextParentLink => {
      const nextParentRect = animatableValue(documentManager.resolve(nextParentLink)?.absoluteRect?.())
      const offsetLeft = (targetLayerRect.x ?? 0) - (nextParentRect.x ?? 0)
      const offsetTop = (targetLayerRect.y ?? 0) - (nextParentRect.y ?? 0)

      memo.collisions = calculateMemoData(memo, nextParentLink)
      documentManager.moveNode(memo?.targetLayerLink, nextParentLink)

      memo.collisions.offsetLeft = offsetLeft - inputPoint.x
      memo.collisions.offsetTop = offsetTop - inputPoint.y
    }

    if (onNextParent) {
      moveNode(onNextParent?.layerKey)
    } else {
      if (!isInsideOfParent) {
        const resultLayerKey = onNextParent?.layerKey ?? memo?.collisions?.currentBreakpointKey

        if (resultLayerKey && memo?.collisions?.parentLayerKey !== resultLayerKey) {
          moveNode(resultLayerKey)
        }
      }
    }

    return {
      x: inputPoint.x + memo.collisions.offsetLeft,
      y: inputPoint.y + memo.collisions.offsetTop
    }
  }
}
