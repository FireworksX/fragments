import { useContext, useMemo, useState } from 'react'
import DirectionVertical from '@/shared/icons/direction-vertical.svg'
import DirectionHorizontal from '@/shared/icons/direction-horizontal.svg'
import AlignTop from '@/shared/icons/align-top.svg'
import AlignBottom from '@/shared/icons/align-bottom.svg'
import AlignHorizontal from '@/shared/icons/align-horizontal.svg'
import Rectangle from '@/shared/icons/rectangle.svg'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { animatableValue } from '@/shared/utils/animatableValue'
import { TabsSelectorItem } from '@/shared/ui/TabsSelector'
import { BoxSide, BoxSizingSides } from '@/shared/ui/BoxSizingSides'
import { useBuilderSelection } from '@/shared/hooks/fragmentBuilder/useBuilderSelection'
import { useLayerInvoker } from '@/shared/hooks/fragmentBuilder/useLayerInvoker'
import { definition } from '@fragments/definition'
import { fromPx } from '@/shared/utils/fromPx'
import { useInterpolation } from '@/shared/hooks/useInterpolation'
import { useLayerValue } from '@/shared/hooks/fragmentBuilder/useLayerValue'
import { booleanTabsSelectorItems } from '@/shared/data'
import { CornerSides } from '@/shared/ui/CornerSides'
import { toPx } from '@/shared/utils/toPx'

const directions: TabsSelectorItem[] = [
  {
    name: definition.layerDirection.vertical,
    label: <DirectionVertical width={16} height={16} />
  },
  {
    name: definition.layerDirection.horizontal,
    label: <DirectionHorizontal width={16} height={16} />
  }
]

const aligns: TabsSelectorItem[] = [
  {
    name: definition.layerAlign.start,
    label: <AlignTop width={16} height={16} />
  },
  {
    name: definition.layerAlign.center,
    label: <AlignHorizontal width={16} height={16} />
  },
  {
    name: definition.layerAlign.end,
    label: <AlignBottom width={16} height={16} />
  }
]

export const useBuilderLayout = () => {
  const { selection, selectionGraph } = useBuilderSelection()
  const [paddingMode, setPaddingMode] = useState('plain')
  const [paddingSide, setPaddingSide] = useState<number | undefined>()
  // const paddingInvoker = layerInvoker('padding')

  const [layerMode, setLayerMode] = useLayerValue('layerMode')
  const [layerDirection, setLayerDirection] = useLayerValue('layerDirection')
  const [layerDistribute, setLayerDistribute] = useLayerValue('layerDistribute')
  const [layerAlign, setLayerAlign] = useLayerValue('layerAlign')
  const [layerGap, setLayerGap] = useLayerValue('layerGap')
  const [layerWrap, setLayerWrap] = useLayerValue('layerWrap')
  const [padding, setPadding] = useLayerValue('padding')
  const paddingSides = padding?.split(' ')?.map(fromPx)
  const paddingSideByIndex = useMemo(() => {
    if (paddingSide === 0) return 'top'
    if (paddingSide === 1) return 'right'
    if (paddingSide === 2) return 'bottom'
    if (paddingSide === 3) return 'left'
  }, [paddingSide])

  return {
    selectionGraph,
    mode: {
      value: layerMode,
      enabled: layerMode === definition.layerMode.flex,
      toggle: () => {
        setLayerMode(layerMode === definition.layerMode.none ? definition.layerMode.flex : definition.layerMode.none)
      }
    },
    direction: {
      items: directions,
      value: layerDirection,
      update: setLayerDirection
    },
    align: {
      items: aligns,
      value: layerAlign,
      update: setLayerAlign
    },
    wrap: {
      items: booleanTabsSelectorItems,
      value: layerWrap,
      update: setLayerWrap
    },
    distribute: {
      items: Object.keys(definition.layerDistribute),
      value: layerDistribute,
      update: setLayerDistribute
    },
    gap: {
      value: layerGap,
      update: setLayerGap
    },
    padding: {
      mode: paddingMode,
      setMode: mode => {
        if (mode === 'sides') {
          const radius = padding ?? '0px'
          setPadding([radius, radius, radius, radius].join(' '))
        } else {
          const radius = padding?.split(' ')?.at(0) ?? '0px'
          setPadding(radius)
        }

        setPaddingMode(mode)
      },
      setPaddingSide,
      items: [
        {
          name: 'plain',
          label: <Rectangle width={10} height={10} />
        },
        {
          name: 'sides',
          label: <BoxSizingSides side={paddingSideByIndex} />
        }
      ],
      setSideValue: (sideIndex, value) => {
        paddingSides[sideIndex] = value
        setPadding(paddingSides.map(toPx).join(' '))
      },
      update: value => setPadding(toPx(value)),
      value: fromPx(padding),
      sidesValues: paddingSides
    }
  }
}
