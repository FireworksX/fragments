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
import { usePartOfInstance } from '@/widgets/renderer/hooks/usePartOfInstance'

export const useLayerPositionStyles = (layerKey: LinkKey, parents: LinkKey[] = []) => {
  const { documentManager } = use(BuilderContext)
  const [layerNode] = useGraph(documentManager, layerKey)
  const { isDocument } = useRenderTarget()
  const { positionType, top, left } = getFieldValueMap(layerNode, ['positionType', 'top', 'left'], documentManager)
  const { isPartOfInstance, deepIndex } = usePartOfInstance(layerKey, parents)

  const isDocumentRender = useMemo(
    () => isDocument && layerNode?._type === nodes.Frame && layerNode?.isTopLevel?.(),
    [isDocument, layerNode]
  )

  return useMemo(() => {
    const onlyAbsolute = (position, value) => {
      return position === defPositionType.absolute ? value : null
    }

    if (isPartOfInstance && deepIndex === 1 && layerNode?._type === nodes.Frame) {
      return {
        position: 'relative'
      }
    }

    return {
      position: to(positionType, position => {
        return isDocumentRender ? 'static' : onlyAbsolute(position, position)
      }),
      top: to([top, positionType], (top, position) => (isDocumentRender ? 'initial' : onlyAbsolute(position, top))),
      left: to([left, positionType], (left, position) => (isDocumentRender ? 'initial' : onlyAbsolute(position, left)))
    }
  }, [deepIndex, isDocumentRender, isPartOfInstance, layerNode?._type, left, positionType, top])
}
