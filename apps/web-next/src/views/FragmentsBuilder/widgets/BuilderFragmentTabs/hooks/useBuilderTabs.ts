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
import { useBuilderDocumentManager } from '@/shared/hooks/fragmentBuilder/useBuilderDocumentManager'

export const useBuilderTabs = () => {
  const { projectSlug } = useProject()
  const { currentFragmentId, isPreview, isValidId, openFragment } = useBuilder()
  const { fetchingUpdate } = useBuilderDocumentManager()
  const { value: tabsNodes, push, splice } = useLocalStorageArray<string>('tabs', [], { sync: true })
  const resultTabsNodes = tabsNodes.filter(tab => isValidId(tab?.id))
  const builderTabKey = tab => `${tab?.id}_${tab?.preview}`
  const tabsKeys = resultTabsNodes.map(builderTabKey)

  const { data: fragmentsNames } = useQuery(FRAGMENTS_NAMES, {
    variables: {
      projectSlug,
      fragmentIds: resultTabsNodes.map(tab => Number(tab.id))
    }
  })

  useEffect(() => {
    const alreadyOpen = tabsKeys?.includes(builderTabKey({ id: currentFragmentId, preview: isPreview }))

    if (currentFragmentId && !alreadyOpen) {
      push({
        type: 'fragment',
        id: currentFragmentId,
        preview: isPreview
      })
    }
  }, [currentFragmentId, isPreview])

  useEffect(() => {
    const alreadyOpen = resultTabsNodes?.find(tab => tab?.id === currentFragmentId?.toString())

    if (!alreadyOpen) {
      openFragment(resultTabsNodes.at(-1)?.id)
    }
  }, [tabsNodes, currentFragmentId])

  const tabs =
    resultTabsNodes?.map(tabNode => {
      const tabName = fragmentsNames?.fragment?.find(fragment => fragment.id === tabNode.id)

      return {
        id: tabNode.id,
        name: tabName,
        preview: tabNode.preview,
        isActive: tabNode.id === currentFragmentId && tabNode.preview === isPreview,
        fetching: tabNode.id === currentFragmentId && fetchingUpdate
      }
    }) ?? []

  return {
    tabs,
    selectTab: (fragmentId, preview: boolean) => {
      openFragment(fragmentId, preview)
    },
    closeTab: index => {
      if (index !== -1) {
        splice(index, 1)
      }
    }
  }
}
