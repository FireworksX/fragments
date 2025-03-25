import { useContext, useRef } from 'react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { useBuilderSelection } from '@/shared/hooks/fragmentBuilder/useBuilderSelection'
import { useLayerInvoker } from '@/shared/hooks/fragmentBuilder/useLayerInvoker'

export const useBuilderImage = () => {
  const { selection } = useBuilderSelection()

  const layerInvoker = useLayerInvoker(selection, ({ node, key, value }) => {
    switch (key) {
      case 'src':
        node.setSrc(value)
        break
    }
  })

  return {
    src: layerInvoker('src'),
    alt: layerInvoker('alt')
  }
}
