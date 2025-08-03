import { useFragmentManager } from '@fragmentsx/render-suite'
import { useBuilder } from '@/shared/hooks/fragmentBuilder/useBuilder'
import { useGlobalManager } from '@fragmentsx/render-suite'
import { builderToasts } from '@/shared/data'
import { useToast } from '@/widgets/Toast/hooks/useToast'
import { makeSnapshot } from '@fragmentsx/render-core'
import { promiseWaiter } from '@fragmentsx/utils'
import { useUpdateFragmentDocumentMutation } from './queries/UpdateFragmentDocument.generated'

export const useBuilderDocument = () => {
  const { open, close, setContext } = useToast()
  const { currentFragmentId } = useBuilder()
  const { manager: globalManager } = useGlobalManager()
  const { manager, loading } = useFragmentManager(currentFragmentId)

  const [updateFragment, { loading: fetchingUpdate }] = useUpdateFragmentDocumentMutation({
    variables: {
      fragmentSlug: +currentFragmentId
    }
  })

  const saveFragment = async () => {
    open(builderToasts.saving)
    const snapshot = makeSnapshot(globalManager, currentFragmentId)
    //
    // const linkedFragmentsIds = (documentManager.resolve(documentManager?.$fragment?.linkerGraphKey)?.fragments ?? [])
    //   .map(manager => +documentManager.entityOfKey(manager?.key)?._id)
    //   .filter(v => !isNaN(v))

    if (snapshot) {
      await promiseWaiter(300)
      await updateFragment({
        variables: {
          fragmentSlug: +currentFragmentId,
          document: snapshot.document,
          linkedFragments: snapshot.linkedFragments,
          linkedGoals: snapshot.linkedGoals
        }
      })
    }

    setContext({ status: 'success' })
    await promiseWaiter(1000)

    close()
  }

  return {
    documentManager: manager,
    loading,
    saveFragment
  }
}
