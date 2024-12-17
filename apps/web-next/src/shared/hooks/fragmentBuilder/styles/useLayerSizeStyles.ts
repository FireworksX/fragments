import { LinkKey } from '@graph-state/core'
import { use, useCallback, useMemo } from 'react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { useGraph } from '@graph-state/react'
import { fragmentGrowingMode, getFieldValue, getFieldValueMap, nodes, sizing } from '@fragments/plugin-fragment'
import { to } from '@react-spring/web'
import { useRenderTarget } from '@/widgets/renderer/hooks/useRenderTarget'

const autoSizes = [sizing.Hug]

export const useLayerSizeStyles = (layerKey: LinkKey) => {
  const { documentManager } = use(BuilderContext)
  const [layerNode] = useGraph(documentManager, layerKey)
  const { isDocument } = useRenderTarget()
  const {
    layoutSizingHorizontal: widthType,
    layoutSizingVertical: heightType,
    width,
    height
  } = getFieldValueMap(
    layerNode,
    ['layoutSizingHorizontal', 'layoutSizingVertical', 'width', 'height'],
    documentManager
  )

  const toValue = useCallback(
    (type: keyof typeof sizing, value: number) => {
      if (autoSizes.includes(type)) {
        return layerNode._type === nodes.FragmentInstance ? 'auto' : 'min-content'
      }

      if (type === sizing.Relative) {
        return `${value}%`
      }

      if (type === sizing.Fill) {
        return `100%`
      }

      return value
    },
    [layerNode._type]
  )

  return useMemo(() => {
    const parent = documentManager.resolve(layerKey)?.getParent()
    const width$ = to([widthType, width], toValue)
    const height$ = to([heightType, height], toValue)

    if (parent?._type === nodes.Fragment && isDocument) {
      return {
        width: parent?.horizontalGrow === fragmentGrowingMode.fill ? '100%' : width$,
        height: parent?.verticalGrow === fragmentGrowingMode.fill ? '100%' : height$
      }
    }

    return {
      width: width$,
      height: height$
    }
  }, [documentManager, layerKey, widthType, width, toValue, heightType, height, isDocument])
}
