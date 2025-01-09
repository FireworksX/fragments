import { use, useEffect, useRef, useState } from 'react'
import { useBuilderTabs } from '@/shared/hooks/fragmentBuilder/useBuilderTabs'
import predictionCard from '@/views/FragmentDetail/fragment.json'
import button from '@/views/FragmentDetail/button.fragment.json'
import { createState } from '@graph-state/core'
import pluginFragmentSpring, { skips, skips as stateSkips } from '@fragments/plugin-fragment-spring'
import loggerPlugin from '@graph-state/plugin-logger'
import fragmentData from '@/views/FragmentDetail/fragment.json'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { useGraph } from '@graph-state/react'

const data = {
  'Fragment:buttonid': button,
  'Fragment:g34gherhg3g': predictionCard
}

export const useBuilderDocument = () => {
  const { builderManager } = use(BuilderContext)
  const [builder] = useGraph(builderManager, builderManager.key)
  const { activeTab, activeTabKey } = useBuilderTabs()
  const [fetching, setFetching] = useState(false)

  useEffect(() => {
    if (!activeTab) {
      builderManager.mutate(builderManager.key, {
        documentManager: null
      })
      return
    }

    if (builder.documentManager) return

    setFetching(true)

    setTimeout(() => {
      const fragmentState = data[activeTab.fragment]

      console.log('create documentManager')
      const documentManager = createState({
        initialState: {},
        plugins: [pluginFragmentSpring(activeTab.fragment), loggerPlugin({ onlyBrowser: true })],
        skip: [...stateSkips, ...skips]
      })
      documentManager.$fragment.applySnapshot(fragmentState)

      builderManager.mutate(builderManager.key, {
        documentManager
      })
      setFetching(false)
    }, 1000)
  }, [activeTabKey])

  return {
    fetching,
    documentManager: builder?.documentManager
  }
}
