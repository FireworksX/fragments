import { use, useEffect } from 'react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { useGraph, useGraphStack } from '@graph-state/react'
import { useLocalStorageArray } from '@/shared/hooks/useLocalStorageArray'
import { useLocalStorageValue } from '@/shared/hooks/useLocalStorageValue'
import { useParams } from 'next/navigation'
import { useSearchParam } from '@/shared/hooks/useSearchParams'
import { useBuilder } from '@/shared/hooks/fragmentBuilder/useBuilder'
import { useQuery } from '@apollo/client'
import { FRAGMENTS_NAMES } from '@/views/FragmentsBuilder/widgets/BuilderFragmentTabs/lib/fragmentsNames'
import { useProject } from '@/shared/hooks/useProject'

export const useBuilderTabs = () => {
  const { projectSlug } = useProject()
  const { currentFragmentId, openFragment } = useBuilder()
  const { value: tabsIds, push, splice } = useLocalStorageArray<string>('tabs', [], { sync: true })

  const { data: fragmentsNames } = useQuery(FRAGMENTS_NAMES, {
    variables: {
      projectSlug,
      fragmentIds: tabsIds.map(Number)
    }
  })

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

  const tabs =
    fragmentsNames?.fragment?.map(fragment => ({
      id: fragment.id,
      name: fragment.name,
      isActive: fragment.id === +(currentFragmentId ?? 0)
    })) ?? []

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
