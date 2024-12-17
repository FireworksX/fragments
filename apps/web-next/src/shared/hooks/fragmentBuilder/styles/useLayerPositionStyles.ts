import {
  getFieldValue,
  getFieldValueMap,
  nodes,
  positionType as defPositionType,
  renderTarget
} from '@fragments/plugin-fragment'
import { to } from '@react-spring/web'
import { use, useMemo } from 'react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { useGraph } from '@graph-state/react'
import { useRenderTarget } from '@/widgets/renderer/hooks/useRenderTarget'
import { LinkKey } from '@graph-state/core'

export const useLayerPositionStyles = (layerKey: LinkKey) => {
  const { documentManager } = use(BuilderContext)
  const [layerNode] = useGraph(documentManager, layerKey)
  const { isDocument } = useRenderTarget()
  const { positionType, top, left } = getFieldValueMap(layerNode, ['positionType', 'top', 'left'], documentManager)

  const isDocumentRender = useMemo(
    () => isDocument && layerNode._type === nodes.Frame && layerNode?.isTopLevel?.(),
    [layerNode._type, isDocument, layerNode]
  )

  return useMemo(() => {
    const onlyAbsolute = (position, value) => (position === defPositionType.absolute ? value : null)

    return {
      position: to(positionType, position => {
        return isDocumentRender ? 'static' : onlyAbsolute(position, position)
      }),
      top: to([top, positionType], (top, position) => (isDocumentRender ? 'initial' : onlyAbsolute(position, top))),
      left: to([left, positionType], (left, position) => (isDocumentRender ? 'initial' : onlyAbsolute(position, left)))
    }
  }, [isDocumentRender, left, positionType, top])
}
