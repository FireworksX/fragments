import { useContext, useMemo } from 'react'
// import { useComponentVariants } from '../../../../../routes/BuilderRoute/hooks/useComponentVariants'
// import { useBuilder } from '../../../../Builder/hooks/useBuilder'
import { BuilderContext } from '@/app/builder/widgets/Builder/BuilderContext'
import { useGraph } from '@graph-state/react'
import { builderLayerMode, builderNodes } from '@fragments/fragments-plugin'
import { useLayerInvokerNew } from '@/app/builder/widgets/Builder/hooks/useLayerInvokerNew'

export const useTreeViewerCell = (layerKey: string) => {
  const { graphState } = useContext(BuilderContext)
  const [layerValue] = useGraph(graphState, layerKey)
  // const { currentKey } = useComponentVariants()
  // const rootKey = builderView === 'component' ? activeComponentField : layerPath.at(0)
  const layerInvoker = useLayerInvokerNew(layerKey)
  const parents = layerValue?.getAllParents?.() ?? []
  // const { features, ...builderActions } = useBuilder()

  const type = layerValue?._type
  // const fullKey = [builderView === 'component' ? currentKey : rootKey, layerKey].join('/')

  const isPrimary = layerValue?.isPrimary
  const isComponent = type === builderNodes.Component
  const isVisible = layerInvoker('visible').value
  const parentIsVisible = useMemo(
    () => parents.every(parent => graphState.resolveValue(parent, 'visible') ?? true),
    [parents, graphState]
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
      hasChildren: layerValue?.children?.length > 0, //isComponent && builderView !== 'component' ? false : layerValue?.children?.length > 0,
      layoutDirection: layerInvoker('layerDirection').value,
      hasLink: !graphState.isEmpty(layerInvoker('hyperlinkHref').value),
      hasEffects: !!effects && Object.values(effects).some(Boolean),
      isPrimary,
      isVisible,
      disabled: !isVisible || !parentIsVisible,
      hidden: !isVisible,
      isComponent,
      isComponentInstance: type === builderNodes.ComponentInstance,
      isPartialComponent:
        type === builderNodes.Component || type === builderNodes.ComponentInstance || parentIsComponent,
      isComponentVariant: type === builderNodes.ComponentVariant
      // ...features
    },
    // ...builderActions,
    rename: (name: string) => {
      layerValue.rename(name)
    }
  }
}
