import { useContext, useState } from 'react'
import { TabsSelectorItem } from '@/app/components/TabsSelector'
import BoxSizingSides, { BoxSide } from '@/app/components/BoxSizingSides/BoxSizingSides'
import {
  builderLayerAlign,
  builderLayerDirection,
  builderLayerDistribute,
  builderLayerMode
} from '@fragments/fragments-plugin'
import DirectionVertical from '@/app/svg/direction-vertical.svg'
import DirectionHorizontal from '@/app/svg/direction-horizontal.svg'
import AlignTop from '@/app/svg/align-top.svg'
import AlignBottom from '@/app/svg/align-bottom.svg'
import AlignHorizontal from '@/app/svg/align-horizontal.svg'
import Rectangle from '@/app/svg/rectangle.svg'
import { useLayerInvoker } from '@/builder/hooks/useLayerInvoker'
import { useBuilderSelection } from '@/builder/hooks/useBuilderSelection'
import { BuilderContext } from '@/builder/BuilderContext'

const directions: TabsSelectorItem[] = [
  {
    name: builderLayerDirection.vertical,
    label: <DirectionVertical width={16} height={16} />
  },
  {
    name: builderLayerDirection.horizontal,
    label: <DirectionHorizontal width={16} height={16} />
  }
]

const aligns: TabsSelectorItem[] = [
  {
    name: builderLayerAlign.start,
    label: <AlignTop width={16} height={16} />
  },
  {
    name: builderLayerAlign.center,
    label: <AlignHorizontal width={16} height={16} />
  },
  {
    name: builderLayerAlign.end,
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
          node.setLayerMode(node.layerMode === builderLayerMode.none ? builderLayerMode.flex : builderLayerMode.none)
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
          node.setPadding(value === documentManager.mixed ? documentManager.mixed : +value)
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
            paddingTop: documentManager.resolveValue?.(node, 'paddingTop'),
            paddingRight: documentManager.resolveValue?.(node, 'paddingRight'),
            paddingBottom: documentManager.resolveValue?.(node, 'paddingBottom'),
            paddingLeft: documentManager.resolveValue?.(node, 'paddingLeft')
          }
      }
    }
  )
  const [paddingSide, setPaddingSide] = useState<BoxSide | undefined>()
  const padding = layerInvoker('padding')
  const paddingSideInvoker = layerInvoker('paddingSide')
  const paddingTop = layerInvoker('paddingTop')

  const onChangePaddingMode = (mode: 'plain' | 'sides') => {
    if (mode === 'plain') {
      padding.onChange(padding.value)
    } else if (mode === 'sides') {
      paddingSideInvoker.onChange({
        side: 'top',
        value: paddingTop.value
      })
    }
  }

  const onChangePadding = (value: number, side?: BoxSide) => {
    if (!side) return padding.onChange(value)

    paddingSideInvoker.onChange({
      side,
      value
    })
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
      items: Object.keys(builderLayerDistribute),
      ...layerInvoker('layerDistribute')
    },
    gap: layerInvoker('layerGap'),
    padding: {
      ...padding,
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
      mode: padding.value === documentManager.mixed ? 'sides' : 'plain',
      onChangeMode: onChangePaddingMode,
      onChange: onChangePadding
    }
  }
}
