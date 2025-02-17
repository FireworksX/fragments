import { LinkKey } from '@graph-state/core'
import { nodes, layerMode as defLayerMode } from '@fragments/plugin-fragment'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'
import { useLayerInfo } from '@/shared/hooks/fragmentBuilder/useLayerInfo'
import { useLayerValue } from '@/shared/hooks/fragmentBuilder/useLayerValue'
import { removeChildren } from '@fragments/renderer-editor'

export const useBuilderLayerFlags = (layerKey: LinkKey) => {
  const { documentManager } = useBuilderDocument()
  const layerInfo = useLayerInfo(layerKey)
  const [visible, setVisible] = useLayerValue('visible', layerKey)
  const [layerMode, setLayerMode] = useLayerValue('layerMode', layerKey)
  const [layerDirection, setLayerDirection] = useLayerValue('layerDirection', layerKey)

  const hasLayout = layerMode === defLayerMode?.flex
  const canRemove = layerInfo.type === nodes.Breakpoint ? !layerInfo?.isPrimary : true
  const canWrap = layerInfo.type !== nodes.Breakpoint
  const canDuplicate = layerInfo.type !== nodes.Fragment
  const canRemoveWrapper = layerInfo.type === nodes.Frame && layerInfo.layer?.children?.length > 0

  const remove = () => removeChildren(documentManager, layerKey)

  const toggleVisible = () => setVisible(!visible)
  const wrapFrame = () => documentManager.createWrapper(layerKey)
  const removeWrapper = () => documentManager.removeWrapper(layerKey)

  return {
    type: layerInfo.type,
    isVisible: visible,
    layerDirection,
    layerMode,
    hasLayout,
    canRemove,
    remove,
    toggleVisible,
    wrapFrame,
    canWrap,
    removeWrapper,
    canRemoveWrapper,
    canDuplicate
  }
}
