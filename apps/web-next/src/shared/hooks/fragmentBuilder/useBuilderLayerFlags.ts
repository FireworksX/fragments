import { LinkKey } from '@graph-state/core'
import { definition } from '@fragmentsx/definition'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'
import { useLayerInfo } from '@/shared/hooks/fragmentBuilder/useLayerInfo'
import { useLayerValue } from '@/shared/hooks/fragmentBuilder/useLayerValue'
import { removeChildren, duplicateLayer } from '@fragmentsx/render-core'

const PERMANENTLY_VISIBLE = [definition.nodes.Fragment, definition.nodes.Collection]

export const useBuilderLayerFlags = (layerKey: LinkKey) => {
  const { documentManager } = useBuilderDocument()
  const layerInfo = useLayerInfo(layerKey)
  const [visible, setVisible] = useLayerValue('visible', layerKey)
  const [layerMode, setLayerMode] = useLayerValue('layerMode', layerKey)
  // const [layerDirection, setLayerDirection] = useLayerValue('layerDirection', layerKey)

  // const layerInfo = {}
  // const visible = true
  const hasLayout = layerMode === definition.layerMode?.flex
  const canRemove = !layerInfo.isBreakpoint ? !layerInfo?.isPrimary : true
  const canWrap = layerInfo.type !== definition.nodes.Fragment && !layerInfo.isBreakpoint && !layerInfo.isRootLayer
  const canDuplicate = layerInfo.type !== definition.nodes.Fragment && !layerInfo.isBreakpoint && !layerInfo.isRootLayer
  const canRemoveWrapper =
    layerInfo.type === definition.nodes.Frame &&
    layerInfo.layer?.children?.length > 0 &&
    layerInfo.isBreakpoint &&
    !layerInfo.isRootLayer

  const remove = () => removeChildren(documentManager, layerKey)
  const duplicate = () => duplicateLayer(documentManager, layerKey)
  const toggleVisible = () => setVisible(!visible)
  const wrapFrame = () => documentManager.createWrapper(layerKey)
  const removeWrapper = () => documentManager.removeWrapper(layerKey)

  return {
    type: layerInfo.type,
    isVisible: !PERMANENTLY_VISIBLE.includes(layerInfo.type) ? visible : true,
    layerDirection: '',
    layerMode: '',
    hasLayout,
    canRemove,
    remove,
    toggleVisible,
    wrapFrame,
    canWrap,
    removeWrapper,
    duplicate,
    canRemoveWrapper,
    canDuplicate
  }
}
