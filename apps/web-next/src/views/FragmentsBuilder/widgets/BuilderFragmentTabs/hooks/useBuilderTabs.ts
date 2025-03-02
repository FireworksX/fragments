import { use, useEffect } from 'react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { useGraph, useGraphStack } from '@graph-state/react'
import { useLocalStorageArray } from '@/shared/hooks/useLocalStorageArray'
import { useLocalStorageValue } from '@/shared/hooks/useLocalStorageValue'
import { useParams } from 'next/navigation'
import { useSearchParam } from '@/shared/hooks/useSearchParams'
import { useBuilder } from '@/shared/hooks/fragmentBuilder/useBuilder'
import { gql, useApolloClient, useQuery } from '@apollo/client'
import { useProject } from '@/shared/hooks/useProject'
import { useBuilderDocumentManager } from '@/shared/hooks/fragmentBuilder/useBuilderDocumentManager'
import { usePrevious } from 'react-use'
import { useFragmentsNamesQuery } from '@/views/FragmentsBuilder/widgets/BuilderFragmentTabs/queries/FragmentsNames.generated'

export const useBuilderTabs = () => {
  const { projectSlug } = useProject()
  const { currentFragmentId, isPreview, isValidId, openFragment } = useBuilder()
  const { fetchingUpdate } = useBuilderDocumentManager()
  const { value: tabsNodes, push, splice } = useLocalStorageArray<string>('tabs', [], { sync: true })
  const resultTabsNodes = tabsNodes.filter(tab => isValidId(tab?.id))
  const builderTabKey = tab => `${tab?.id}_${tab?.preview}`
  const tabsKeys = resultTabsNodes.map(builderTabKey)
  const prevTabsNodes = usePrevious(tabsNodes)
  const apolloClient = useApolloClient()

  const { data: fragmentsNames } = useFragmentsNamesQuery({
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

  /**
   * Обслуживает логику, когда открыто несколько вкладок и
   * закрываем активную вкладку, то нужно изменить активность
   * на последнюю вкладку.
   */
  useEffect(() => {
    if (tabsNodes.length < prevTabsNodes?.length) {
      openFragment(resultTabsNodes.at(-1)?.id)
    }
  }, [tabsNodes, prevTabsNodes, currentFragmentId, openFragment, resultTabsNodes])

  useEffect(() => {
    if (!tabsKeys.length) {
      openFragment(null)
    }
  }, [tabsKeys.length])

  const tabs =
    resultTabsNodes?.map((tabNode, index) => {
      const fragment = apolloClient.readFragment({
        id: `FragmentGet:${tabNode.id}`,
        fragment: gql`
          fragment _ on FragmentGet {
            name
          }
        `
      })

      return {
        id: tabNode.id,
        key: tabsKeys[index],
        name: fragment?.name,
        preview: tabNode.preview,
        isActive: +tabNode.id === currentFragmentId && tabNode.preview === isPreview,
        fetching: +tabNode.id === currentFragmentId && fetchingUpdate
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
