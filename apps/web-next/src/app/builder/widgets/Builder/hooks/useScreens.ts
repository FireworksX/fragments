import { useContext } from 'react'
import { BuilderContext } from '@/app/builder/widgets/Builder/BuilderContext'
import { useGraphFields, useGraphStack } from '@graph-state/react'
import { builderNodes } from '@fragments/fragments-plugin'

export const useScreens = () => {
  const { graphState } = useContext(BuilderContext)
  const screensKeys = useGraphFields(graphState, builderNodes.Screen)
  const screensValues = useGraphStack(graphState, screensKeys)
  const primaryScreen = screensValues.find(breakpoint => breakpoint.isPrimary)

  const addScreen = (name: string, width: number) => {
    const nextScreenKey = primaryScreen.clone()

    graphState.mutate(nextScreenKey, {
      name,
      width,
      isPrimary: false
    })

    graphState.resolve(graphState.documentNode).appendChild(nextScreenKey)
  }

  return {
    primaryScreen,
    screensValues,
    screensKeys,
    addScreen
  }
}
