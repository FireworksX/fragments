import { useContext, useState } from 'react'
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
import {
  layerAlign,
  layerDirection,
  layerDistribute as defLayerDistribute,
  layerMode as defLayerMode,
  parseCssSpacing
} from '@fragments/plugin-fragment-spring'
import { getFieldValue } from '@fragments/plugin-fragment'
import { fromPx } from '@/shared/utils/fromPx'
import { useInterpolation } from '@/shared/hooks/useInterpolation'
import { useLayerValue } from '@/shared/hooks/fragmentBuilder/useLayerValue'
import { booleanTabsSelectorItems } from '@/shared/data'

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

export const useBuilderLayout = () => {
  const { selection, selectionGraph } = useBuilderSelection()
  const layerInvoker = useLayerInvoker(selection, ({ node, key, value }) => {
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
        node.setPadding(value)
        break
      case 'paddingSide':
        node.setPadding(value.side, +value.value)
        break
    }
  })
  const [paddingMode, setPaddingMode] = useState('plain')
  const [paddingSide, setPaddingSide] = useState<BoxSide | undefined>()
  const paddingInvoker = layerInvoker('padding')

  const [layerMode, setLayerMode] = useLayerValue('layerMode')
  const [layerDirection, setLayerDirection] = useLayerValue('layerDirection')
  const [layerDistribute, setLayerDistribute] = useLayerValue('layerDistribute')
  const [layerAlign, setLayerAlign] = useLayerValue('layerAlign')
  const [layerGap, setLayerGap] = useLayerValue('layerGap')
  const [layerWrap, setLayerWrap] = useLayerValue('layerWrap')

  return {
    selectionGraph,
    mode: {
      value: layerMode,
      enabled: layerMode === defLayerMode.flex,
      toggle: () => {
        setLayerMode(layerMode === defLayerMode.none ? defLayerMode.flex : defLayerMode.none)
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
      items: Object.keys(defLayerDistribute),
      value: layerDistribute,
      update: setLayerDistribute
    },
    gap: {
      value: layerGap,
      update: setLayerGap
    },
    padding: {
      ...paddingInvoker,
      value: useInterpolation([paddingInvoker.value], fromPx),
      sidesValues: useInterpolation([paddingInvoker.value], parseCssSpacing),
      mode: paddingMode,
      setPaddingMode: mode => {
        const maxValue = Math.max(...Object.values(parseCssSpacing(animatableValue(paddingInvoker.value))).map(fromPx))
        if (mode === 'plain') {
          paddingInvoker.onChange(maxValue)
        }
        setPaddingMode(mode)
      },
      setCornerSideValue: (side, value) => {
        const nextSides = { ...parseCssSpacing(animatableValue(paddingInvoker.value)), [side]: value }
        paddingInvoker.onChange(nextSides)
      },
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
      setPaddingSide
    }
  }
}
