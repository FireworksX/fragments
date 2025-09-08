import { useBuilderSelection } from '@/shared/hooks/fragmentBuilder/useBuilderSelection'
import { useLayerInfo } from '@/shared/hooks/fragmentBuilder/useLayerInfo'
import { definition } from '@fragmentsx/definition'
import { useBuilderCreator } from '@/shared/hooks/fragmentBuilder/useBuilderCreator'
import { keyOfEntity, LinkKey } from '@graph-state/core'
import { moveChildren, removeChildren } from '@fragmentsx/render-suite'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'

export const useLayerWrapper = (layerKey: LinkKey) => {
  const { documentManager } = useBuilderDocument()
  const { createFrame } = useBuilderCreator()
  const layerInfo = useLayerInfo(layerKey)
  const canWrap = layerInfo.type !== definition.nodes.Fragment && !layerInfo.isBreakpoint && !layerInfo.isRootLayer
  const canRemoveWrapper =
    layerInfo.type === definition.nodes.Frame &&
    layerInfo.layer?.children?.length > 0 &&
    !layerInfo.isBreakpoint &&
    !layerInfo.isRootLayer

  const createWrapper = () => {
    if (canWrap) {
      const position = layerInfo.indexInParent
      const [wrapperFrame] = createFrame(layerInfo.parent)
      moveChildren(documentManager, layerKey, wrapperFrame)
      moveChildren(documentManager, wrapperFrame, layerInfo.parent, position)
    }
  }

  const removeWrapper = () => {
    if (canRemoveWrapper) {
      const children = layerInfo?.layer?.children ?? []
      const layerIndexInParent = layerInfo.parent?.children?.findIndex(
        child => keyOfEntity(child) === keyOfEntity(layerKey)
      )

      children.forEach(child => {
        moveChildren(documentManager, child, layerInfo.parent, layerIndexInParent)
      })

      removeChildren(documentManager, layerKey)
    }
  }

  return {
    canWrap,
    createWrapper,
    canRemoveWrapper,
    removeWrapper
  }
}
