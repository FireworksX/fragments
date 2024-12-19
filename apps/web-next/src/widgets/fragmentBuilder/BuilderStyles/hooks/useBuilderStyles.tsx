import { useContext, useState } from 'react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import Rectangle from '@/shared/icons/rectangle.svg'
import { to } from '@fragments/springs-factory'
import { CornerSide, CornerSides } from '@/shared/ui/CornerSides'
import { TabsSelectorItem } from '@/shared/ui/TabsSelector'
import { animatableValue } from '@/shared/utils/animatableValue'
import { useBuilderSelection } from '@/shared/hooks/fragmentBuilder/useBuilderSelection'
import { useLayerInvoker } from '@/shared/hooks/fragmentBuilder/useLayerInvoker'
import { popoutsStore } from '@/shared/store/popouts.store'
import { borderType, getFieldValue, nodes, overflow } from '@fragments/plugin-fragment'
import { parseCssSpacing, stringifyCssSpacing } from '@fragments/plugin-fragment-spring'
import { fromPx } from '@/shared/utils/fromPx'
import { useInterpolation } from '@/shared/hooks/useInterpolation'
import { isValue } from '@fragments/utils'

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
  const { selection, selectionGraph } = useBuilderSelection()
  const isTextNode = selectionGraph?._type === nodes.Image
  const isImageNode = selectionGraph?._type === nodes.Text
  const layerInvoker = useLayerInvoker(selection, ({ node, key, value }) => {
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
        node.setCornerRadius(value)
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
    }
  })
  const borderTypeInvoker = layerInvoker('borderType')
  const borderWidthInvoker = layerInvoker('borderWidth')
  const borderColorInvoker = layerInvoker('borderColor')
  const fillTypeInvoker = layerInvoker('fillType')
  const solidFillInvoker = layerInvoker('solidFill')
  const zIndexInvoker = layerInvoker('zIndex')
  const cornerRadiusInvoker = layerInvoker('cornerRadius')
  const overflowInvoker = layerInvoker('overflow')
  const [cornerMode, setCornerMode] = useState('plain')
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

  return {
    selectionGraph,
    visible: {
      items: visible,
      ...layerInvoker('visible')
    },
    opacity: layerInvoker('opacity'),
    overflow: {
      disabled: isTextNode,
      options: overflowOptions,
      ...overflowInvoker
    },
    radius: {
      disabled: isTextNode,
      cornerMode,
      setCornerMode: mode => {
        const maxValue = Math.max(
          ...Object.values(parseCssSpacing(animatableValue(cornerRadiusInvoker.value))).map(fromPx)
        )
        if (mode === 'plain') {
          cornerRadiusInvoker.onChange(maxValue)
        }
        setCornerMode(mode)
      },
      setCornerSide,
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
      setCornerSideValue: (side, value) => {
        const nextSides = { ...parseCssSpacing(animatableValue(cornerRadiusInvoker.value)), [side]: value }
        cornerRadiusInvoker.onChange(nextSides)
      },
      ...cornerRadiusInvoker,
      value: useInterpolation([cornerRadiusInvoker.value], fromPx),
      sidesValues: useInterpolation([cornerRadiusInvoker.value], parseCssSpacing)
    },
    zIndex: {
      ...zIndexInvoker,
      visible: useInterpolation([zIndexInvoker.value], isValue),
      onClick: clickZIndex
    },
    border: {
      borderTypeInvoker,
      borderWidthInvoker,
      borderColorInvoker,
      disabled: isTextNode,
      onClick: openBorder,
      onReset: () => borderTypeInvoker.onChange(borderType.None)
    },
    fill: {
      ...solidFillInvoker,
      type: fillTypeInvoker.value,
      disabled: isTextNode || isImageNode,
      onClick: openFill,
      onReset: () => fillTypeInvoker.onChange(null)
    }
  }
}
