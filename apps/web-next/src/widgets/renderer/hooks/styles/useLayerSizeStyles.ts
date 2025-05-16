import { LinkKey } from '@graph-state/core'
import { use, useCallback, useMemo } from 'react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { useGraph } from '@graph-state/react'
import { fragmentGrowingMode, getFieldValue, getFieldValueMap, nodes, sizing } from '@fragmentsx/plugin-fragment'
import { to } from '@react-spring/web'
import { useRenderTarget } from '@/widgets/renderer/hooks/useRenderTarget'
import { usePartOfInstance } from '@/widgets/renderer/hooks/usePartOfInstance'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'
import { useFieldValue } from '@/shared/hooks/fragmentBuilder/useFieldValue'

const autoSizes = [sizing.Hug]
const skipNodes = [nodes.Fragment]

export const useLayerSizeStyles = (layerKey: LinkKey, parents: LinkKey[] = []) => {
  const { documentManager } = useBuilderDocument()
  const [layerNode] = useGraph(documentManager, layerKey)
  const { isDocument } = useRenderTarget()
  const { isPartOfInstance, deepIndex, instanceKey } = usePartOfInstance(layerKey, parents)
  const width$ = useFieldValue(layerKey, 'width')
  const height$ = useFieldValue(layerKey, 'height')
  const layoutSizingHorizontal$ = useFieldValue(layerKey, 'layoutSizingHorizontal')
  const layoutSizingVertical$ = useFieldValue(layerKey, 'layoutSizingVertical')

  const toValue = useCallback(
    (type: keyof typeof sizing, value: number) => {
      if (autoSizes.includes(type)) {
        return layerNode?._type === nodes.FragmentInstance ? 'auto' : 'min-content'
      }

      if (type === sizing.Relative) {
        return `${value}%`
      }

      if (type === sizing.Fill) {
        return `100%`
      }

      return value
    },
    [layerNode?._type]
  )

  return useMemo(() => {
    if (skipNodes.includes(layerNode?._type)) return {}

    const parent = documentManager.resolve(layerKey)?.getParent?.()
    const toWidth$ = to([layoutSizingHorizontal$, width$], toValue)
    const toHeight$ = to([layoutSizingVertical$, height$], toValue)

    if (isPartOfInstance && deepIndex === 1 && layerNode?._type === nodes.Frame) {
      const { layoutSizingHorizontal: instanceWidthType, layoutSizingVertical: instanceHeightType } = getFieldValueMap(
        instanceKey,
        ['layoutSizingHorizontal', 'layoutSizingVertical'],
        documentManager
      )

      return {
        width: to([instanceWidthType, width$], (hSizing, sourceValue) =>
          hSizing === sizing.Hug ? sourceValue : '100%'
        ),
        height: to([instanceHeightType, height$], (hSizing, sourceValue) =>
          hSizing === sizing.Hug ? sourceValue : '100%'
        )
      }
    }

    if (parent?._type === nodes.Fragment && isDocument && !isPartOfInstance) {
      return {
        width: parent?.horizontalGrow === fragmentGrowingMode.fill ? '100%' : width$,
        height: parent?.verticalGrow === fragmentGrowingMode.fill ? '100%' : height$
      }
    }

    return {
      width: toWidth$,
      height: toHeight$
    }
  }, [
    layerNode?._type,
    documentManager,
    layerKey,
    layoutSizingHorizontal$,
    width$,
    toValue,
    layoutSizingVertical$,
    height$,
    isPartOfInstance,
    deepIndex,
    isDocument,
    instanceKey
  ])
}
