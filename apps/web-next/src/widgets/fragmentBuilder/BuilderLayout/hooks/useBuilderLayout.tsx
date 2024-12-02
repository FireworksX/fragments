import { useContext, useState } from 'react'

import DirectionVertical from '@/shared/icons/direction-vertical.svg'
import DirectionHorizontal from '@/shared/icons/direction-horizontal.svg'
import AlignTop from '@/shared/icons/align-top.svg'
import AlignBottom from '@/shared/icons/align-bottom.svg'
import AlignHorizontal from '@/shared/icons/align-horizontal.svg'
import Rectangle from '@/shared/icons/rectangle.svg'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { to } from '@react-spring/web'
import { animatableValue } from '@/shared/utils/animatableValue'
import { TabsSelectorItem } from '@/shared/ui/TabsSelector'
import { BoxSide, BoxSizingSides } from '@/shared/ui/BoxSizingSides'
import { useBuilderSelection } from '@/shared/hooks/fragmentBuilder/useBuilderSelection'
import { useLayerInvoker } from '@/shared/hooks/fragmentBuilder/useLayerInvoker'
import { layerAlign, layerDirection, layerDistribute, layerMode } from '@fragments/plugin-state'
import { getFieldValue } from '@fragments/plugin-fragment'

const directions: TabsSelectorItem[] = [
  {
    name: layerDirection.vertical,
    label: <DirectionVertical width={16} height={16} />
  },
  {
    name: layerDirection.horizontal,
    label: <DirectionHorizontal width={16} height={16} />
  }
]

const aligns: TabsSelectorItem[] = [
  {
    name: layerAlign.start,
    label: <AlignTop width={16} height={16} />
  },
  {
    name: layerAlign.center,
    label: <AlignHorizontal width={16} height={16} />
  },
  {
    name: layerAlign.end,
    label: <AlignBottom width={16} height={16} />
  }
]

const wrap: TabsSelectorItem[] = [
  {
    name: true,
    label: 'Yes'
  },
  {
    name: false,
    label: 'No'
  }
]

export const useBuilderLayout = () => {
  const { documentManager } = useContext(BuilderContext)
  const { selection, selectionGraph } = useBuilderSelection()
  const layerInvoker = useLayerInvoker(
    selection,
    ({ node, key, value }) => {
      switch (key) {
        case 'layerMode':
          if (!node.layerMode) {
            node.setLayerMode(layerMode.flex)
          } else {
            node.setLayerMode(animatableValue(node.layerMode) === layerMode.none ? layerMode.flex : layerMode.none)
          }

          break
        case 'layerDirection':
          node.setLayerDirection(value)
          break
        case 'layerDistribute':
          node.setLayerDistribute(value)
          break
        case 'layerAlign':
          node.setLayerAlign(value)
          break
        case 'layerWrap':
          node.setLayerWrap(value)
          break
        case 'layerGap':
          node.setLayerGap(+value)
          break
        case 'padding':
          node.setPadding(value ? +value : value)
          break
        case 'paddingSide':
          node.setPadding(value.side, +value.value)
          break
      }
    },
    ({ key, node }) => {
      switch (key) {
        case 'paddingSide':
          return {
            top: getFieldValue(node, 'paddingTop', documentManager),
            right: getFieldValue(node, 'paddingRight', documentManager),
            bottom: getFieldValue(node, 'paddingBottom', documentManager),
            left: getFieldValue(node, 'paddingLeft', documentManager)
          }
      }
    }
  )
  const [paddingSide, setPaddingSide] = useState<BoxSide | undefined>()
  const padding = layerInvoker('padding')
  const paddingSideInvoker = layerInvoker('paddingSide')

  const onChangePaddingMode = (mode: 'plain' | 'sides') => {
    padding.onChange(mode === 'plain' ? 0 : null)
  }

  return {
    selectionGraph,
    mode: layerInvoker('layerMode'),
    direction: {
      items: directions,
      ...layerInvoker('layerDirection')
    },
    align: {
      items: aligns,
      ...layerInvoker('layerAlign')
    },
    wrap: {
      items: wrap,
      ...layerInvoker('layerWrap')
    },
    distribute: {
      items: Object.keys(layerDistribute),
      ...layerInvoker('layerDistribute')
    },
    gap: layerInvoker('layerGap'),
    padding: {
      ...padding,
      mode: to(animatableValue(selectionGraph?.isMixedPadding?.()), v => (!v ? 'plain' : 'sides')),
      isMixed: selectionGraph?.isMixedPadding?.(),
      items: [
        {
          name: 'plain',
          label: <Rectangle width={10} height={10} />
        },
        {
          name: 'sides',
          label: <BoxSizingSides side={paddingSide} />
        }
      ],
      side: paddingSide,
      setPaddingSide,
      paddingSide: paddingSideInvoker,
      onChangeMode: onChangePaddingMode,
      sidesInvoker: paddingSideInvoker
    }
  }
}
