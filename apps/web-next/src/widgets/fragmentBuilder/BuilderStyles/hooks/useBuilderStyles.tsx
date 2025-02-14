import { useContext, useMemo, useState } from 'react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import Rectangle from '@/shared/icons/rectangle.svg'
import { to } from '@fragments/springs-factory'
import { CornerSide, CornerSides } from '@/shared/ui/CornerSides'
import { TabsSelectorItem } from '@/shared/ui/TabsSelector'
import { animatableValue } from '@/shared/utils/animatableValue'
import { useBuilderSelection } from '@/shared/hooks/fragmentBuilder/useBuilderSelection'
import { useLayerInvoker } from '@/shared/hooks/fragmentBuilder/useLayerInvoker'
import { popoutsStore } from '@/shared/store/popouts.store'
import { borderType as defBorderType, getFieldValue, nodes, overflow, paintMode } from '@fragments/plugin-fragment'
import { parseCssSpacing, stringifyCssSpacing } from '@fragments/plugin-fragment-spring'
import { fromPx } from '@/shared/utils/fromPx'
import { useInterpolation } from '@/shared/hooks/useInterpolation'
import { isValue } from '@fragments/utils'
import { useLayerValue } from '@/shared/hooks/fragmentBuilder/useLayerValue'
import { toPx } from '@/shared/utils/toPx'

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
  const [cornerMode, setCornerMode] = useState('plain')
  const [cornerSide, setCornerSide] = useState<number | undefined>()

  const [opacity, setOpacity] = useLayerValue('opacity')
  const [visible, setVisible] = useLayerValue('visible')
  const [zIndex, setZIndex] = useLayerValue('zIndex')
  const [overflow, setOverflow] = useLayerValue('overflow')
  const [borderRadius, setBorderRadius] = useLayerValue('borderRadius')
  const borderRadiusSides = borderRadius?.split(' ')?.map(fromPx)
  const borderRadiusSideByIndex = useMemo(() => {
    if (cornerSide === 0) return 'top'
    if (cornerSide === 1) return 'right'
    if (cornerSide === 2) return 'bottom'
    if (cornerSide === 3) return 'left'
  }, [cornerSide])

  const [fillType, setFillType] = useLayerValue('fillType')
  const [solidFill, setSolidFill] = useLayerValue('solidFill')

  const [borderType, setBorderType] = useLayerValue('borderType')
  const [borderColor, setBorderColor] = useLayerValue('borderColor')

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

  return {
    selectionGraph,
    visible: {
      value: visible,
      update: setVisible
    },
    opacity: {
      value: opacity,
      update: setOpacity
    },
    overflow: {
      disabled: isTextNode,
      options: overflowOptions,
      value: overflow,
      update: setOverflow
    },
    radius: {
      disabled: isTextNode,
      cornerMode,
      setCornerMode: mode => {
        if (mode === 'sides') {
          const radius = borderRadius ?? '0px'
          setBorderRadius([radius, radius, radius, radius].join(' '))
        } else {
          const radius = borderRadius?.split(' ')?.at(0) ?? '0px'
          setBorderRadius(radius)
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
          label: <CornerSides side={borderRadiusSideByIndex} />
        }
      ],
      setCornerSideValue: (sideIndex, value) => {
        borderRadiusSides[sideIndex] = value
        setBorderRadius(borderRadiusSides.map(toPx).join(' '))
      },
      update: value => setBorderRadius(toPx(value)),
      value: fromPx(borderRadius),
      sidesValues: borderRadiusSides
    },
    zIndex: {
      value: zIndex,
      update: setZIndex
    },
    border: {
      borderType,
      borderColor,
      disabled: isTextNode,
      onClick: openBorder,
      onReset: () => setBorderType(defBorderType.None)
    },
    fill: {
      solidFill,
      type: fillType,
      disabled: isTextNode || isImageNode,
      onClick: openFill,
      onReset: () => setFillType(paintMode.None)
    }
  }
}
