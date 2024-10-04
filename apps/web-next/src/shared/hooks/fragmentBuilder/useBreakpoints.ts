import { useGraphFields, useGraphStack } from '@graph-state/react'
import { builderNodes } from '@fragments/fragments-plugin'
import { useContext } from 'react'
import { BuilderContext } from '@/shared/providers/BuilderContext'

export const useBreakpoints = () => {
  const { documentManager } = useContext(BuilderContext)
  const breakpointKeys = useGraphFields(documentManager, builderNodes.Breakpoint)
  const breakpointValues = useGraphStack(documentManager, breakpointKeys)
  const primaryScreen = breakpointValues.find(breakpoint => breakpoint.isPrimary)

  const addBreakpoint = (name: string, width: number) => {
    documentManager.createBreakpoint({ name, width })
  }

  return {
    primaryScreen,
    breakpointValues,
    breakpointKeys,
    addBreakpoint
  }
}
