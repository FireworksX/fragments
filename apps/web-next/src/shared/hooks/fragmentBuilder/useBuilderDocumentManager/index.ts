import { use, useCallback, useEffect } from 'react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { useGraph } from '@graph-state/react'
import { useBuilder } from '@/shared/hooks/fragmentBuilder/useBuilder'
import { useMutation, useQuery } from '@apollo/client'
import { FRAGMENT_DOCUMENT } from './lib/fragmentDocument'
import { UPDATE_FRAGMENT_DOCUMENT } from './lib/updateFragmentDocument'
import { getEmptyFragment } from '@/shared/data/emptyFragment'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'
import { getButtonFragment } from '@/shared/data/buttonFragment'
import { useFragmentDocumentQuery } from '@/shared/hooks/fragmentBuilder/useBuilderDocumentManager/queries/FragmentDocument.generated'
import { useUpdateFragmentDocumentMutation } from '@/shared/hooks/fragmentBuilder/useBuilderDocumentManager/queries/UpdateFragmentDocument.generated'
import { useGlobalManager } from '@/shared/hooks/fragmentBuilder/useBuilderGlobalContext'
import { makeSnapshot } from '@fragments/render-core'
import { useToast } from '@/widgets/Toast/hooks/useToast'
import { builderToasts } from '@/shared/data'
import { promiseWaiter } from '@fragmentsx/utils'

export const useBuilderDocumentManager = () => {
  const { documentManager } = useBuilderDocument()
  const { builderManager } = use(BuilderContext)
  const { globalManager } = useGlobalManager()
  const { currentFragmentId } = useBuilder()
  const fragmentKey = `Fragment:${currentFragmentId}`
  const { open, close, setContext } = useToast()

  // const {
  //   data,
  //   loading: fetchingDocument,
  //   refetch
  // } = useFragmentDocumentQuery({
  //   skip: true
  // })

  const [updateFragment, { loading: fetchingUpdate }] = useUpdateFragmentDocumentMutation({
    variables: {
      fragmentSlug: +currentFragmentId
    }
  })

  const createDocumentManager = useCallback(async (fragmentSlug: number) => {
    // const fragmentDocument = await refetch({
    //   fragmentSlug
    // })
    //
    // const fragment = fragmentDocument?.data?.fragment?.at(0)
    // const document = typeof fragment?.document === 'string' ? JSON.parse(fragment.document ?? '{}') : fragment?.document
    //
    // const resultDocument = getEmptyFragment(fragment?.id) //Object.keys(document).length === 0 ? getEmptyFragment(fragment?.id) : document
    //
    // globalManager.createFragmentManager('button', getButtonFragment())
    // return globalManager.createFragmentManager(fragment?.id, resultDocument)
    // return builderManager.$documents.createDocumentManager(`${nodes.Fragment}:${fragment?.id}`, resultDocument)
  }, [])

  // useEffect(() => {
  //   // createDocumentManager(currentFragmentId)
  //   console.log(globalManager)
  // }, [currentFragmentId])

  const saveFragment = async () => {
    open(builderToasts.saving)
    const currentDocument = makeSnapshot(documentManager)
    //
    // const linkedFragmentsIds = (documentManager.resolve(documentManager?.$fragment?.linkerGraphKey)?.fragments ?? [])
    //   .map(manager => +documentManager.entityOfKey(manager?.key)?._id)
    //   .filter(v => !isNaN(v))

    await promiseWaiter(300)
    await updateFragment({
      variables: {
        fragmentSlug: +currentFragmentId,
        document: currentDocument,
        linkedFragments: [] //linkedFragmentsIds
      }
    })
    setContext({ status: 'success' })
    await promiseWaiter(1000)

    close()
  }

  return {
    fetchingUpdate,
    fetching: false,
    saveFragment,
    createDocumentManager
  }
}
