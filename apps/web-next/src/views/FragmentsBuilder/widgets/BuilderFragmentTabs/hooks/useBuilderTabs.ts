import { use, useEffect } from 'react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { useGraph, useGraphStack } from '@graph-state/react'
import { useLocalStorageArray } from '@/shared/hooks/useLocalStorageArray'
import { useLocalStorageValue } from '@/shared/hooks/useLocalStorageValue'
import { useParams } from 'next/navigation'
import { useSearchParam } from '@/shared/hooks/useSearchParams'
import { useBuilder } from '@/shared/hooks/fragmentBuilder/useBuilder'

export const useBuilderTabs = (inputBuilderManager?: unknown) => {
  const { currentFragmentId, openFragment } = useBuilder()
  const { value: tabsIds, push, splice } = useLocalStorageArray<string>('tabs', [], { sync: true })

  useEffect(() => {
    if (currentFragmentId && !tabsIds.includes(currentFragmentId)) {
      push(currentFragmentId)
    }
  }, [currentFragmentId])

  useEffect(() => {
    if (!tabsIds.includes(currentFragmentId)) {
      openFragment(tabsIds.at(-1))
    }
  }, [tabsIds, currentFragmentId])

  const tabs = tabsIds.map(tabId => ({ id: tabId, name: tabId, isActive: tabId === currentFragmentId }))

  return {
    tabs,
    selectTab: fragmentId => {
      openFragment(fragmentId)
    },
    closeTab: fragmentId => {
      const index = tabsIds.indexOf(fragmentId)

      if (index !== -1) {
        splice(index, 1)
      }
    }
  }
}
