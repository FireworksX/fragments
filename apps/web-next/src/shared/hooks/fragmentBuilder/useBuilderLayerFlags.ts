import { LinkKey } from '@graph-state/core'
import { definition } from '@fragmentsx/definition'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'
import { useLayerInfo } from '@/shared/hooks/fragmentBuilder/useLayerInfo'
import { useLayerValue } from '@/shared/hooks/fragmentBuilder/useLayerValue'
import { removeChildren, duplicateLayer } from '@fragmentsx/render-core'
import { useLayerWrapper } from '@/shared/hooks/fragmentBuilder/useLayerWrapper'

const PERMANENTLY_VISIBLE = [definition.nodes.Fragment, definition.nodes.Collection]

export const useBuilderLayerFlags = (layerKey: LinkKey) => {
  const { documentManager } = useBuilderDocument()
  const layerInfo = useLayerInfo(layerKey)
  const [visible, setVisible] = useLayerValue('visible', layerKey)
  const [layerMode, setLayerMode] = useLayerValue('layerMode', layerKey)
  // const [layerDirection, setLayerDirection] = useLayerValue('layerDirection', layerKey)

  const { canWrap, createWrapper, canRemoveWrapper, removeWrapper } = useLayerWrapper(layerKey)

  // const layerInfo = {}
  // const visible = true
  const hasLayout = layerMode === definition.layerMode?.flex
  const canRemove = !layerInfo.isBreakpoint ? !layerInfo?.isPrimary : true
  const canDuplicate = layerInfo.type !== definition.nodes.Fragment && !layerInfo.isBreakpoint && !layerInfo.isRootLayer

  const remove = () => removeChildren(documentManager, layerKey)
  const duplicate = () => duplicateLayer(documentManager, layerKey)
  const toggleVisible = () => setVisible(!visible)
  const wrapFrame = createWrapper

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
