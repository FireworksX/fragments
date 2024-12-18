import { use, useMemo } from 'react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { useGraph } from '@graph-state/react'
import { stateAlias } from '@/views/FragmentDetail/ui/FragmentDetail'
import { LinkKey } from '@graph-state/core'
import { useLayerSizeStyles } from '@/shared/hooks/fragmentBuilder/styles/useLayerSizeStyles'
import { useLayerPositionStyles } from '@/shared/hooks/fragmentBuilder/styles/useLayerPositionStyles'
import { useLayerSceneStyles } from '@/shared/hooks/fragmentBuilder/styles/useLayerSceneStyles'
import { useLayerFillStyles } from '@/shared/hooks/fragmentBuilder/styles/useLayerFillStyles'
import { getFieldValueMap } from '@fragments/plugin-fragment'
import { useLayerFlexStyles } from '@/shared/hooks/fragmentBuilder/styles/useLayerFlexStyles'
import { useRenderTarget } from '@/widgets/renderer/hooks/useRenderTarget'

export const useLayerStyles = (layerLink: LinkKey, parents: LinkKey[] = []) => {
  const { documentManager } = use(BuilderContext)
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

  return useMemo(() => {
    return {
      ...sizeStyles,
      ...positionStyles,
      ...sceneStyles,
      ...fillStyles,
      ...flexStyles,
      whiteSpace,
      borderRadius: cornerRadius,
      padding,
      userSelect: isCanvas ? 'none' : null
    }
  }, [sizeStyles, positionStyles, sceneStyles, fillStyles, flexStyles, whiteSpace, cornerRadius, padding, isCanvas])
}
