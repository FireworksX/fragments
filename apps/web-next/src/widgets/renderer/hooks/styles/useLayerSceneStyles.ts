import { use, useMemo } from 'react'
import { getFieldValueMap, layerMode as defLayerMode } from '@fragments/plugin-fragment'
import { LinkKey } from '@graph-state/core'
import { to } from '@react-spring/web'
import { useFieldValue } from '@/shared/hooks/fragmentBuilder/useFieldValue'

export const useLayerSceneStyles = (layerKey: LinkKey) => {
  const visible = useFieldValue(layerKey, 'visible')
  const layerMode = useFieldValue(layerKey, 'layerMode')
  const opacity = useFieldValue(layerKey, 'opacity')
  const overflow = useFieldValue(layerKey, 'overflow')

  return useMemo(() => {
    const isFlex = to(layerMode, mode => mode === defLayerMode.flex)

    return {
      opacity,
      overflow,
      display: to([visible, isFlex], (value, isFlex) => {
        return value ? (isFlex ? 'flex' : 'block') : 'none'
      })
    }
  }, [layerMode, opacity, overflow, visible])
}
