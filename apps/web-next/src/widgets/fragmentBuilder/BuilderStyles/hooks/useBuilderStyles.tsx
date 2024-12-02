import { useContext, useState } from 'react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import Rectangle from '@/shared/icons/rectangle.svg'
import { to } from '@react-spring/web'
import { CornerSide, CornerSides } from '@/shared/ui/CornerSides'
import { TabsSelectorItem } from '@/shared/ui/TabsSelector'
import { animatableValue } from '@/shared/utils/animatableValue'
import { useBuilderSelection } from '@/shared/hooks/fragmentBuilder/useBuilderSelection'
import { useLayerInvoker } from '@/shared/hooks/fragmentBuilder/useLayerInvoker'
import { popoutsStore } from '@/shared/store/popouts.store'
import { borderType, nodes } from '@fragments/plugin-state'
import { getFieldValue, overflow } from '@fragments/plugin-fragment'

const visible: TabsSelectorItem[] = [
  {
    name: true,
    label: 'Yes'
  },
  {
    name: false,
    label: 'No'
  }
]

const overflowOptions = Object.keys(overflow)

export const useBuilderStyles = () => {
  const { documentManager } = useContext(BuilderContext)
  const { selection, selectionGraph } = useBuilderSelection()
  const isTextLayer = selectionGraph?._type === nodes.Text
  const layerInvoker = useLayerInvoker(
    selection,
    ({ node, key, value }) => {
      switch (key) {
        case 'visible':
          node.setVisible(value)
          break
        case 'opacity':
          node.setOpacity(value)
          break
        case 'overflow':
          node.setOverflow(value)
          break
        case 'zIndex':
          node.setZIndex(value)
          break
        case 'cornerRadius':
          node.setCornerRadius(value ? +value : value)
          break
        case 'borderType':
          node.setBorderType(value)
          break
        case 'fillType':
          node.setFillType(value)

          if (!value) {
            // closePopout()
          }
          break
        case 'cornerRadiusSide':
          node.setCornerRadius(value.side, +value.value)
          break
      }
    },
    ({ key, node }) => {
      switch (key) {
        case 'cornerRadiusSide':
          return {
            tl: getFieldValue(node, 'topLeftRadius', documentManager),
            tr: getFieldValue(node, 'topRightRadius', documentManager),
            br: getFieldValue(node, 'bottomRightRadius', documentManager),
            bl: getFieldValue(node, 'bottomLeftRadius', documentManager)
          }
      }
    }
  )
  const borderTypeInvoker = layerInvoker('borderType')
  const borderWidthInvoker = layerInvoker('borderWidth')
  const borderColorInvoker = layerInvoker('borderColor')
  const fillTypeInvoker = layerInvoker('fillType')
  const solidFillInvoker = layerInvoker('solidFill')
  const zIndexInvoker = layerInvoker('zIndex')
  const cornerRadiusSideInvoker = layerInvoker('cornerRadiusSide')
  const cornerRadiusInvoker = layerInvoker('cornerRadius')
  const overflowInvoker = layerInvoker('overflow')

  const [cornerSide, setCornerSide] = useState<CornerSide | undefined>()

  const openBorder = () => {
    popoutsStore.open('border', {
      initial: true
    })
  }

  const openFill = () => {
    popoutsStore.open('fill', {
      initial: true
    })
  }

  const clickZIndex = () => {
    zIndexInvoker.onChange(0)
  }

  const onChangeRadiusMode = (mode: 'plain' | 'sides') => {
    cornerRadiusInvoker.onChange(mode === 'plain' ? 0 : null)
  }

  return {
    selectionGraph,
    visible: {
      items: visible,
      ...layerInvoker('visible')
    },
    opacity: layerInvoker('opacity'),
    overflow: {
      options: overflowOptions,
      ...overflowInvoker
    },
    radius: {
      disabled: isTextLayer,
      isMixed: selectionGraph?.isMixedRadius?.(),
      setCornerSide,
      onChangeRadiusMode,
      items: [
        {
          name: 'plain',
          label: <Rectangle width={10} height={10} />
        },
        {
          name: 'sides',
          label: <CornerSides side={cornerSide} />
        }
      ],
      sidesInvoker: cornerRadiusSideInvoker,
      ...cornerRadiusInvoker
    },
    zIndex: {
      ...zIndexInvoker,
      onClick: clickZIndex
    },
    border: {
      borderTypeInvoker,
      borderWidthInvoker,
      borderColorInvoker,
      disabled: isTextLayer,
      onClick: openBorder,
      onReset: () => borderTypeInvoker.onChange(borderType.None)
    },
    fill: {
      ...solidFillInvoker,
      type: fillTypeInvoker.value,
      disabled: isTextLayer,
      onClick: openFill,
      onReset: () => fillTypeInvoker.onChange(null)
    }
  }
}
