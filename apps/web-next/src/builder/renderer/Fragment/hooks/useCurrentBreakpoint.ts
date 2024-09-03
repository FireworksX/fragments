import { useMeasure } from 'react-use'
import { GraphState } from '@graph-state/core'
import { useGraphFields, useGraphStack } from '@graph-state/react'
import { nodes } from '@fragments/plugin-state'
import { useMemo } from 'react'
import { animatableValue } from '@/builder/utils/animatableValue'

export const useCurrentBreakpoint = (documentManager: GraphState) => {
  const breakpoints = useGraphFields(documentManager, nodes.Breakpoint)
  const [containerRef, containerRect] = useMeasure()
  const breakpointValues = useGraphStack(documentManager, breakpoints)

  const currentBreakpoint = useMemo(() => {
    const sortedBreakpoints = breakpointValues.toSorted((a, b) => {
      return animatableValue(b.width) - animatableValue(a.width)
    })

    return (
      sortedBreakpoints.find(breakpoint => animatableValue(breakpoint.width) <= containerRect.width) ??
      sortedBreakpoints.at(-1)
    )
  }, [containerRect.width, breakpointValues])

  return {
    containerRef,
    currentBreakpoint,
    currentBreakpointLink: documentManager.keyOfEntity(currentBreakpoint)
  }
}
