import { useBuilderSelection } from '@/shared/hooks/fragmentBuilder/useBuilderSelection'
import { isValue } from '@fragments/utils'
import { definition } from '@fragments/definition'
import { useLayerInfo } from '@/shared/hooks/fragmentBuilder/useLayerInfo'
import { useLayerValue } from '@/shared/hooks/fragmentBuilder/useLayerValue'
import { useEffect } from 'react'

export const useBuilderStyles = () => {
  const { selection } = useBuilderSelection()
  const { type } = useLayerInfo(selection)
  const isTextNode = type === definition.nodes.Image
  const isImageNode = type === definition.nodes.Text

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
