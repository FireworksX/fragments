import { use, useEffect } from 'react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { useGraph } from '@graph-state/react'
import { useBuilder } from '@/shared/hooks/fragmentBuilder/useBuilder'
import { useMutation, useQuery } from '@apollo/client'
import { FRAGMENT_DOCUMENT } from './lib/fragmentDocument'
import { UPDATE_FRAGMENT_DOCUMENT } from './lib/updateFragmentDocument'
import { getEmptyFragment } from '@/shared/data/emptyFragment'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'

export const useBuilderDocumentManager = () => {
  const { documentManager } = useBuilderDocument()
  const { builderManager } = use(BuilderContext)
  const { currentFragmentId } = useBuilder()
  const fragmentKey = `Fragment:${currentFragmentId}`

  const { data, loading: fetchingDocument } = useQuery(FRAGMENT_DOCUMENT, {
    variables: {
      fragmentSlug: +currentFragmentId
    },
    skip: !currentFragmentId
  })

  const [updateFragment, { loading: fetchingUpdate }] = useMutation(UPDATE_FRAGMENT_DOCUMENT, {
    variables: {
      fragmentSlug: +currentFragmentId
    }
  })

  useEffect(() => {
    const fragment = data?.fragment?.at(0)

    if (fragment) {
      const document =
        typeof fragment?.document === 'string' ? JSON.parse(data.fragment[0].document ?? '{}') : fragment?.document
      const resultDocument = Object.keys(document).length === 0 ? getEmptyFragment(fragment?.id) : document

      builderManager.$documents.createDocumentManager(fragmentKey, resultDocument)
      builderManager.$documents.setActiveDocumentManager(fragmentKey)
    }
  }, [data])

  useEffect(() => {
    if (!currentFragmentId) {
      builderManager.$documents.setActiveDocumentManager(null)
    }
  }, [currentFragmentId])

  const saveFragment = async () => {
    const currentDocument = documentManager.$fragment.makeSnapshot()

    await updateFragment({
      variables: {
        fragmentSlug: +currentFragmentId,
        document: currentDocument
      }
    })
  }

  return {
    fetchingUpdate,
    fetching: fetchingDocument,
    saveFragment
  }
}
