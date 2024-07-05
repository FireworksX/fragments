import { useContext, useMemo } from 'react'
import { useGraph } from '@graph-state/react'
import { builderLayerMode, builderNodes } from '@fragments/fragments-plugin/performance'
import { BuilderContext } from '@/builder/BuilderContext'
import { useLayerInvoker } from '@/builder/hooks/useLayerInvoker'
import { useBuilderManager } from '@/builder/hooks/useBuilderManager'
import { to } from '@react-spring/web'
import { useBuilderActions } from '@/builder/hooks/useBuilderActions'

export const useTreeViewerCell = (layerKey: string) => {
  const { documentManager } = useContext(BuilderContext)
  const view = ''
  // const [{ view }] = useGraph(graphState)
  const [layerValue] = useGraph(documentManager, layerKey)
  // const { currentKey } = useComponentVariants()
  // const rootKey = builderView === 'component' ? activeComponentField : layerPath.at(0)
  const layerInvoker = useLayerInvoker(layerKey)
  const parents = layerValue?.getAllParents?.() ?? []
  const { features, ...builderActions } = useBuilderActions()

  const type = layerValue?._type
  // const fullKey = [builderView === 'component' ? currentKey : rootKey, layerKey].join('/')

  const isPrimary = layerValue?.isPrimary
  const isComponent = type === builderNodes.Component
  const isVisible = layerInvoker('visible').value
  const parentIsVisible = useMemo(
    () => parents.every(parent => documentManager.resolveValue(parent, 'visible') ?? true),
    [parents, documentManager]
  )

  const parentIsComponent = useMemo(() => parents.some(parent => parent._type === builderNodes.Component), [parents])
  const effects = layerInvoker('effects').value

  // const minMax = useMemo(() => {
  //   if (type !== builderNodes.Screen || !isBrowser) return undefined
  //
  //   const currentWidth = layerValue.width
  //   const breakpointSizes: string[] = allBreakpointValue.map(breakpoint => breakpoint.width)
  //
  //   const sortedSizes = breakpointSizes.toSorted((a, b) => b - a)
  //   const minMaxValues = sortedSizes.map((size, index, arr) => {
  //     if (index === 0) {
  //       return {
  //         width: size,
  //         min: size,
  //         max: null
  //       }
  //     }
  //
  //     const prevSize = arr[index - 1]
  //     if (index === arr.length - 1) {
  //       return {
  //         width: size,
  //         min: 0,
  //         max: prevSize
  //       }
  //     }
  //
  //     return {
  //       width: size,
  //       min: size,
  //       max: prevSize
  //     }
  //   })
  //
  //   return minMaxValues.find(({ width }) => +width === +currentWidth)
  // }, [allBreakpointValue, layerValue.width, type])

  return {
    type,
    name: layerInvoker('name').value ?? layerKey,
    min: undefined,
    max: undefined,
    flags: {
      hasLayout: layerInvoker('layerMode').value === builderLayerMode.flex,
      hasChildren: isComponent && view !== 'component' ? false : layerValue?.children?.length > 0,
      layoutDirection: layerInvoker('layerDirection').value,
      hasLink: !documentManager.isEmpty(layerInvoker('hyperlinkHref').value),
      hasEffects: !!effects && Object.values(effects).some(Boolean),
      isPrimary,
      isVisible,
      disabled: !isVisible || !parentIsVisible,
      hidden: to(isVisible, v => !v),
      isComponent,
      isComponentInstance: type === builderNodes.ComponentInstance,
      isPartialComponent:
        type === builderNodes.Component || type === builderNodes.ComponentInstance || parentIsComponent,
      isComponentVariant: type === builderNodes.ComponentVariant,
      ...features
    },
    ...builderActions,
    rename: (name: string) => {
      layerValue.rename(name)
    }
  }
}
