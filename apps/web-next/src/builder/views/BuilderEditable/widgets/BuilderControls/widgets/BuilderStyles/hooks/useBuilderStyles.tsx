import { TabsSelectorItem } from '@/app/components/TabsSelector'
import { useContext, useState } from 'react'
import { builderBorderType, builderNodes } from '@fragments/fragments-plugin/performance'
import { popoutsStore } from '@/app/store/popouts.store'
import { useBuilderSelection } from '@/builder/hooks/useBuilderSelection'
import { useLayerInvoker } from '@/builder/hooks/useLayerInvoker'
import { BuilderContext } from '@/builder/BuilderContext'
import Rectangle from '@/app/svg/rectangle.svg'
import BoxSizingSides, { BoxSide } from '@/app/components/BoxSizingSides/BoxSizingSides'
import CornerSides, { CornerSide } from '@/app/components/CornerSides/CornerSides'
import { to } from '@react-spring/web'

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

export const useBuilderStyles = () => {
  const { documentManager } = useContext(BuilderContext)
  const { selection, selectionGraph } = useBuilderSelection()
  const isTextLayer = selectionGraph?._type === builderNodes.Text
  const layerInvoker = useLayerInvoker(
    selection,
    ({ node, key, value }) => {
      switch (key) {
        case 'visible':
          node.toggleVisible(value)
          break
        case 'opacity':
          node.setOpacity(value)
          break
        case 'zIndex':
          node.setZIndex(value)
          break
        case 'cornerRadius':
          node.setCornerRadius(+value)
          break
        case 'borderType':
          node.setBorderType(value)
          break
        case 'fillType':
          node.setFillType(value)

          if (!value) {
            // $closePopout()
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
            tl: documentManager.resolveValue?.(node, 'topLeftRadius'),
            tr: documentManager.resolveValue?.(node, 'topRightRadius'),
            br: documentManager.resolveValue?.(node, 'bottomRightRadius'),
            bl: documentManager.resolveValue?.(node, 'bottomLeftRadius')
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
    cornerRadiusInvoker.onChange(mode === 'plain' ? 0 : -1)
  }

  return {
    selectionGraph,
    visible: {
      items: visible,
      ...layerInvoker('visible')
    },
    opacity: layerInvoker('opacity'),
    radius: {
      disabled: isTextLayer,
      mode: to(selectionGraph?.isMixedRadius(), v => (!v ? 'plain' : 'sides')),
      isMixed: selectionGraph?.isMixedRadius(),
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
      disabled: documentManager.isEmpty(zIndexInvoker.value),
      ...zIndexInvoker,
      onClick: clickZIndex
    },
    border: {
      borderTypeInvoker,
      borderWidthInvoker,
      borderColorInvoker,
      disabled: isTextLayer,
      onClick: openBorder,
      onReset: () => borderTypeInvoker.onChange(builderBorderType.None)
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
