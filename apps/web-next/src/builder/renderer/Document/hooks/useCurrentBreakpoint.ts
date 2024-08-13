import { useMeasure } from 'react-use'
import { GraphState } from '@graph-state/core'
import { useGraphFields, useGraphStack } from '@graph-state/react'
import { builderNodes } from '@fragments/fragments-plugin'
import { useMemo } from 'react'

export const useCurrentBreakpoint = (documentManager: GraphState) => {
  const breakpoints = useGraphFields(documentManager, builderNodes.Breakpoint)
  const [containerRef, containerRect] = useMeasure()
  const breakpointValues = useGraphStack(documentManager, breakpoints)

  const currentBreakpoint = useMemo(() => {
    const sortedBreakpoints = breakpointValues.toSorted((a, b) => {
      return b.width.get() - a.width.get()
    })

    return (
      sortedBreakpoints.find(breakpoint => breakpoint.width.get() <= containerRect.width) ?? sortedBreakpoints.at(-1)
    )
  }, [containerRect.width, breakpointValues])

  return {
    containerRef,
    currentBreakpoint,
    currentBreakpointLink: documentManager.keyOfEntity(currentBreakpoint)
  }
}
