import { useGraph, useGraphFields, useGraphStack } from '@graph-state/react'
import { useContext } from 'react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { nodes } from '@fragments/plugin-state'

export const useBreakpoints = () => {
  const { documentManager } = useContext(BuilderContext)
  const [fragmentGraph] = useGraph(documentManager, documentManager.fragment)
  const breakpointKeys = fragmentGraph?.children ?? []
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
