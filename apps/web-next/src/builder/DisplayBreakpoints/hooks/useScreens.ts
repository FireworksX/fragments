import { useGraphFields, useGraphStack } from '@graph-state/react'
import { builderNodes } from '@fragments/fragments-plugin'
import { useContext } from 'react'
import { BuilderContext } from '@/builder/BuilderContext'

export const useScreens = () => {
  const { documentManager } = useContext(BuilderContext)
  const screensKeys = useGraphFields(documentManager, builderNodes.Screen)
  const screensValues = useGraphStack(documentManager, screensKeys)
  const primaryScreen = screensValues.find(breakpoint => breakpoint.isPrimary)

  const addScreen = (name: string, width: number) => {
    documentManager.createScreen({ name, width })
  }

  return {
    primaryScreen,
    screensValues,
    screensKeys,
    addScreen
  }
}
