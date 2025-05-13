import { use, useMemo } from 'react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { useGraph } from '@graph-state/react'
import { LinkKey } from '@graph-state/core'
import { useLayerSizeStyles } from './styles/useLayerSizeStyles'
import { useLayerPositionStyles } from './styles/useLayerPositionStyles'
import { useLayerSceneStyles } from './styles/useLayerSceneStyles'
import { useLayerFillStyles } from './styles/useLayerFillStyles'
import { getFieldValueMap } from '@fragmentsx/plugin-fragment'
import { useLayerFlexStyles } from './styles/useLayerFlexStyles'
import { useRenderTarget } from '@/widgets/renderer/hooks/useRenderTarget'
import { useLayerBorderStyles } from '@/widgets/renderer/hooks/styles/useLayerBorderStyles'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'

export const useLayerStyles = (layerLink: LinkKey, parents: LinkKey[] = []) => {
  const { documentManager } = useBuilderDocument()
  const [layerNode] = useGraph(documentManager, layerLink)
  const { isCanvas } = useRenderTarget()

  const { whiteSpace, cornerRadius, padding } = getFieldValueMap(
    layerNode,
    ['whiteSpace', 'cornerRadius', 'padding'],
    documentManager
  )
  const sizeStyles = useLayerSizeStyles(layerLink, parents)
  const positionStyles = useLayerPositionStyles(layerLink, parents)
  const sceneStyles = useLayerSceneStyles(layerLink)
  const fillStyles = useLayerFillStyles(layerLink)
  const flexStyles = useLayerFlexStyles(layerLink)
  const borderStyles = useLayerBorderStyles(layerLink)

  return useMemo(() => {
    return {
      ...sizeStyles,
      ...positionStyles,
      ...sceneStyles,
      ...fillStyles,
      ...flexStyles,
      ...borderStyles,
      whiteSpace,
      borderRadius: cornerRadius,
      padding,
      userSelect: isCanvas ? 'none' : null
    }
  }, [
    sizeStyles,
    positionStyles,
    sceneStyles,
    fillStyles,
    flexStyles,
    borderStyles,
    whiteSpace,
    cornerRadius,
    padding,
    isCanvas
  ])
}
