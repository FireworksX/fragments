import { use, useCallback, useEffect } from 'react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { useGraph } from '@graph-state/react'
import { useBuilder } from '@/shared/hooks/fragmentBuilder/useBuilder'
import { useMutation, useQuery } from '@apollo/client'
import { FRAGMENT_DOCUMENT } from './lib/fragmentDocument'
import { UPDATE_FRAGMENT_DOCUMENT } from './lib/updateFragmentDocument'
import { getEmptyFragment } from '@/shared/data/emptyFragment'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'
import { nodes } from '@fragments/plugin-fragment'
import { makeSnapshot } from '@fragments/renderer-editor'
import { useGlobalContext } from '@fragments/renderer-editor'
import { getButtonFragment } from '@/shared/data/buttonFragment'
import { useFragmentDocumentQuery } from '@/shared/hooks/fragmentBuilder/useBuilderDocumentManager/queries/FragmentDocument.generated'
import { useUpdateFragmentDocumentMutation } from '@/shared/hooks/fragmentBuilder/useBuilderDocumentManager/queries/UpdateFragmentDocument.generated'

export const useBuilderDocumentManager = () => {
  const { context: globalContext } = useGlobalContext()
  const { documentManager } = useBuilderDocument()
  const { builderManager } = use(BuilderContext)
  const { currentFragmentId } = useBuilder()
  const fragmentKey = `Fragment:${currentFragmentId}`

  const {
    data,
    loading: fetchingDocument,
    refetch
  } = useFragmentDocumentQuery({
    skip: true
  })

  const [updateFragment, { loading: fetchingUpdate }] = useUpdateFragmentDocumentMutation({
    variables: {
      fragmentSlug: +currentFragmentId
    }
  })

  const createDocumentManager = useCallback(
    async (fragmentSlug: number) => {
      const fragmentDocument = await refetch({
        fragmentSlug
      })

      const fragment = fragmentDocument?.data?.fragment?.at(0)
      const document =
        typeof fragment?.document === 'string' ? JSON.parse(fragment.document ?? '{}') : fragment?.document

      const resultDocument = Object.keys(document).length === 0 ? getEmptyFragment(fragment?.id) : document

      globalContext.createFragmentManager('button', getButtonFragment())

      return globalContext.createFragmentManager(fragment?.id, resultDocument)
      // return builderManager.$documents.createDocumentManager(`${nodes.Fragment}:${fragment?.id}`, resultDocument)
    },
    [refetch]
  )

  useEffect(() => {
    createDocumentManager(currentFragmentId)
  }, [currentFragmentId])

  const saveFragment = async () => {
    const currentDocument = makeSnapshot(documentManager)
    //
    // const linkedFragmentsIds = (documentManager.resolve(documentManager?.$fragment?.linkerGraphKey)?.fragments ?? [])
    //   .map(manager => +documentManager.entityOfKey(manager?.key)?._id)
    //   .filter(v => !isNaN(v))

    await updateFragment({
      variables: {
        fragmentSlug: +currentFragmentId,
        document: currentDocument,
        linkedFragments: [] //linkedFragmentsIds
      }
    })
  }

  return {
    fetchingUpdate,
    fetching: fetchingDocument,
    saveFragment,
    createDocumentManager
  }
}
