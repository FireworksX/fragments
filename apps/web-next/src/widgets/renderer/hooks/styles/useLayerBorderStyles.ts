import { use, useMemo } from 'react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { borderType as borderTypeDef } from '@fragments/plugin-fragment'
import { LinkKey } from '@graph-state/core'
import { to } from '@react-spring/web'
import { useFieldValue } from '@/shared/hooks/fragmentBuilder/useFieldValue'
import { toPx } from '@/shared/utils/toPx'

export const useLayerBorderStyles = (layerKey: LinkKey) => {
  const borderType = useFieldValue(layerKey, 'borderType')
  const borderWidth = useFieldValue(layerKey, 'borderWidth')
  const borderColor = useFieldValue(layerKey, 'borderColor')

  return useMemo(() => {
    return {
      border: to([borderType, borderWidth, borderColor], (type, width, color) => {
        if (typeof type === 'string' && type !== borderTypeDef.None) {
          return `${toPx(width)} ${type.toLowerCase()} ${color}`
        }

        return ''
      })
    }
  }, [borderColor, borderType, borderWidth])
}
