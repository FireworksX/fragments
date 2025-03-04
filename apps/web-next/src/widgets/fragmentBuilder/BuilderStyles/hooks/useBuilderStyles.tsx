import { useBuilderSelection } from '@/shared/hooks/fragmentBuilder/useBuilderSelection'
import { nodes } from '@fragments/plugin-fragment'
import { isValue } from '@fragments/utils'
import { useLayerInfo } from '@/shared/hooks/fragmentBuilder/useLayerInfo'
import { useLayerValue } from '@/shared/hooks/fragmentBuilder/useLayerValue'
import { useEffect } from 'react'

export const useBuilderStyles = () => {
  const { selection } = useBuilderSelection()
  const { type } = useLayerInfo(selection)
  const isTextNode = type === nodes.Image
  const isImageNode = type === nodes.Text

  const [zIndex, setZIndex] = useLayerValue('zIndex')

  return {
    overflow: {
      hidden: isTextNode
    },
    radius: {
      hidden: isTextNode
    },
    zIndex: {
      hidden: !(isValue(zIndex) && zIndex !== -1),
      value: zIndex,
      update: setZIndex
    },
    border: {
      hidden: isTextNode
    },
    fill: {
      hidden: isTextNode || isImageNode
    }
  }
}
