import { BuilderContext } from '@/builder/BuilderContext'
import { useContext } from 'react'
import { useGraph } from '@graph-state/react'
import { LinkKey } from '@graph-state/core'
import { to } from '@react-spring/web'
import { builderLayerMode, builderNodes } from '@fragments/fragments-plugin/performance'
import { useLayerInvoker } from '@/shared/hooks/fragmentBuilder/useLayerInvoker'

export const useBuilderLayerFlags = (layerKey: LinkKey) => {
  const { documentManager } = useContext(BuilderContext)
  const [layerNode] = useGraph(documentManager, layerKey)
  const layerInvoker = useLayerInvoker(layerKey, ({ key, node, value }) => {
    switch (key) {
      case 'visible':
        node.toggleVisible(value)
        break
    }
  })

  const visibleInvoker = layerInvoker('visible')
  const isVisible$ = visibleInvoker.value
  const layerMode$ = layerInvoker('layerMode').value
  const layerDirection$ = layerInvoker('layerDirection').value
  const hasLayout$ = to(layerMode$, mode => mode === builderLayerMode.flex)
  const canRemove = layerNode?._type === builderNodes.Breakpoint ? !layerNode?.isPrimary : true
  const canWrap = layerNode?._type !== builderNodes.Breakpoint
  const canRemoveWrapper = layerNode?._type === builderNodes.Frame && layerNode?.children.length > 0

  const remove = () => layerNode?.remove()

  const toggleVisible = () => visibleInvoker.onChange()

  const wrapFrame = () => documentManager.createWrapper(layerKey)
  const removeWrapper = () => documentManager.removeWrapper(layerKey)

  return {
    type: layerNode?._type,
    isVisible$,
    layerDirection$,
    layerMode$,
    hasLayout$,
    canRemove,
    remove,
    toggleVisible,
    wrapFrame,
    canWrap,
    removeWrapper,
    canRemoveWrapper
  }
}
