import { useContext } from 'react'
import { BuilderContext } from '@/builder/BuilderContext'
import { DragEvent } from '@/builder/views/BuilderEditable/widgets/BuilderCanvas/hooks/useCanvas'
import { animatableValue } from '@/builder/utils/animatableValue'
import { getNodePosition } from '@/app/utils/getNodePosition'
import { findRefNode } from '@/builder/utils/findRefNode'
import { definitions } from '@fragments/plugin-state'
import { isPartialKey } from '@graph-state/core'
import { nextTick } from '@/builder/utils/nextTick'

// Функция для определения пересечения двух элементов
const isIntersecting = (rect1, rect2, isFull = false) => {
  if (!rect1 || !rect2) return false

  if (isFull) {
    // Проверяем, что все границы элемента находятся внутри контейнера
    return (
      rect2.top >= rect1.top && // Верхняя граница элемента ниже или на уровне верхней границы контейнера
      rect2.left >= rect1.left && // Левая граница элемента правее или на уровне левой границы контейнера
      rect2.bottom <= rect1.bottom && // Нижняя граница элемента выше или на уровне нижней границы контейнера
      rect2.right <= rect1.right // Правая граница элемента левее или на уровне правой границы контейнера
    )
  }
  return !(
    (
      rect1.right < rect2.left || // Правая граница первого слоя левее левой границы второго слоя
      rect1.left > rect2.right || // Левая граница первого слоя правее правой границы второго слоя
      rect1.bottom < rect2.top || // Нижняя граница первого слоя выше верхней границы второго слоя
      rect1.top > rect2.bottom
    ) // Верхняя граница первого слоя ниже нижней границы второго слоя
  )
}

export const useDragCollisions = () => {
  const { documentManager, canvasManager } = useContext(BuilderContext)

  const calculateMemoData = (memo, parentLayerKey) => {
    const prevParentLayerKey = memo?.collisions?.parentLayerKey ?? parentLayerKey
    const parentLayerNode = documentManager.resolve(parentLayerKey)
    const parentLayerRect = getNodePosition(findRefNode(parentLayerKey))

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
      rect: getNodePosition(findRefNode(documentManager.keyOfEntity(layer)))
    }))

    return {
      offsetLeft: 0,
      offsetTop: 0,
      initialParentLayerKey: memo?.collisions?.initialParentLayerKey ?? parentLayerKey,
      prevParentLayerKey,
      prevParentLayerRect: memo?.collisions?.parentLayerRect ?? parentLayerRect,
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

    const targetLayerRect = getNodePosition(findRefNode(memo?.targetLayerLink))

    const isInsideOfParent = isIntersecting(memo?.collisions?.parentLayerRect, targetLayerRect)
    const onNextParent = memo?.collisions?.alternativeParents?.findLast(layer => {
      return isIntersecting(layer.rect, targetLayerRect, true)
    })

    const moveNode = nextParentLink => {
      const targetLayerRect = getNodePosition(findRefNode(memo?.targetLayerLink))
      const parentLayerRect = getNodePosition(findRefNode(nextParentLink))

      const offsetLeft = (targetLayerRect.left ?? 0) - (parentLayerRect.left ?? 0)
      const offsetTop = (targetLayerRect.top ?? 0) - (parentLayerRect.top ?? 0)

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
        if (memo?.collisions?.parentLayerKey !== resultLayerKey) {
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
